import * as assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import * as path from '@stoplight/path';
import { fileURLToPath } from 'node:url';
import { describe, test } from 'node:test';
import escapeRegExp from 'lodash/escapeRegExp.js';
import { IS_WINDOWS } from './consts.ts';
import { parseScenarioFile } from './parser.ts';
import type { IScenarioFile } from './parser.ts';
import type { SpawnFn } from './runtime/types.ts';
import { applyReplacements, normalizeLineEndings } from './utils.ts';

const { spawnNode } = (await import(IS_WINDOWS ? './runtime/win.ts' : './runtime/nix.ts')) as { spawnNode: SpawnFn };

const HARNESS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url).replaceAll('\\', '/')), '..');
const ROOT_DIR = path.join(HARNESS_DIR, '..');
const SCENARIOS_DIR = path.join(HARNESS_DIR, 'scenarios');
// outside of test-harness/, so that the scenarios do not inherit its "type": "module"
const TMP_DIR = path.join(ROOT_DIR, '.cache/test-harness');
const BIN = path.join(ROOT_DIR, 'packages/cli/binaries/openlint');

const CONCURRENCY = 3;
const TIMEOUT = 15_000;

// narrows the run to scenarios matching the glob, e.g. SCENARIO='formats/*'
const FILTER = process.env.SCENARIO ?? '**/*.scenario';

async function writeAssets(cwd: string, env: Record<string, string>, assets: IScenarioFile['assets']): Promise<void> {
  const files = assets.map(([asset, content]) => {
    const assetPath = asset.replace(/^asset:/, '');
    const filepath = path.join(cwd, assetPath);
    const filename = path.basename(assetPath);

    env[asset] = filepath;
    env[`${asset}|no-ext`] = filepath.slice(0, -path.extname(filename).length);
    env[`${asset}|filename|no-ext`] = filename;

    return [filepath, content];
  });

  // all the env entries have to be known before any content gets its replacements applied
  await Promise.all(
    files.map(async ([filepath, content]) => {
      await fs.mkdir(path.dirname(filepath), { recursive: true });
      await fs.writeFile(filepath, applyReplacements(content, env));
    }),
  );
}

// executing Date() before or after spawnNode were constantly leading to occasional mismatches,
// as the success of that approach was highly bound to the time spent on the actual spawnNode call
// this is a tad smarter, because instead of naively hoping the date will match, we try to extract the date from the actual output
// this regular expression matches "00:43:59" in "Thu Jul 08 2021 00:43:59 GMT+0200 (Central European Summer Time)".
// this regular expression is locale agnostic: it will match "Fri May 31 2024 18:26:32 GMT+0300 (за східноєвропейським літнім часом)"
function createDateRegExp(): RegExp {
  return RegExp(
    escapeRegExp(String(Date()))
      .replace(/(\d\d:){2}\d\d/, '(\\d\\d:){2}\\d\\d')
      .replace(/\s\\\(.+\\\)/, '\\s+\\([\\w\\s]+\\)'),
  );
}

function stripOpenLintVersionFromSarif(str: string): string {
  try {
    const parsed = JSON.parse(str);
    if (parsed?.$schema?.includes('sarif')) {
      for (const run of parsed.runs ?? []) {
        if (run?.tool?.driver?.version) {
          delete run.tool.driver.version;
        }
      }
      return JSON.stringify(parsed, null, 2);
    }
  } catch {
    // not SARIF or not JSON
  }
  return str;
}

await fs.mkdir(TMP_DIR, { recursive: true });

const files: string[] = [];
for await (const file of fs.glob(FILTER, { cwd: SCENARIOS_DIR })) {
  files.push(file.replaceAll('\\', '/'));
}
files.sort();

const scenarios = await Promise.all(
  files.map(async file => ({ file, ...parseScenarioFile(await fs.readFile(path.join(SCENARIOS_DIR, file), 'utf8')) })),
);

describe('scenarios', { concurrency: CONCURRENCY }, () => {
  for (const { file, ...scenario } of scenarios) {
    if (scenario.command === null) {
      test.todo(`${scenario.test} (${file})`);
      continue;
    }

    const command = scenario.command;

    test(`${scenario.test} (${file})`, { timeout: TIMEOUT }, async () => {
      const cwd = await fs.mkdtemp(path.join(TMP_DIR, `${path.basename(file, true)}-`));
      const env: Record<string, string> = { __dirname: cwd, bin: BIN, ...scenario.env };

      await writeAssets(cwd, env, scenario.assets);

      const output = await spawnNode(applyReplacements(command, env), env, cwd);
      const date = createDateRegExp();

      Reflect.defineProperty(env, 'date', {
        configurable: true,
        enumerable: true,
        get(): string {
          return output.stdout.match(date)?.[0] ?? Date();
        },
      });

      if (scenario.stderr !== null) {
        assert.equal(output.stderr, normalizeLineEndings(applyReplacements(scenario.stderr, env)));
      } else if (output.stderr !== '') {
        throw new Error(output.stderr);
      }

      if (scenario.stdout !== null) {
        let actual = normalizeLineEndings(output.stdout);
        let expected = normalizeLineEndings(applyReplacements(scenario.stdout, env));

        if (/--format=sarif\b/i.test(command)) {
          actual = stripOpenLintVersionFromSarif(actual);
          expected = stripOpenLintVersionFromSarif(expected);
        }

        assert.equal(actual, expected);
      }

      if (scenario.status !== null) {
        assert.equal(output.status, Number.parseInt(scenario.status));
      }

      // kept on failure, so that the assets and the output can be inspected
      await fs.rm(cwd, { recursive: true, force: true });
    });
  }
});
