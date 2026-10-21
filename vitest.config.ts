import * as fs from 'node:fs';
import * as path from 'node:path';
import { defineConfig, type Plugin, type TestProjectInlineConfiguration } from 'vitest/config';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { playwright } from '@vitest/browser-playwright';

// the generated standalone validators call `require`, which does not exist in the browser
const hoistRequires = (): Plugin => ({
  name: 'openlint:hoist-requires',
  enforce: 'pre',
  transform(code, id) {
    if (!/schemas\/validators\.ts$/.test(id)) {
      return null;
    }

    const imports: string[] = [];
    const body = code.replace(/\brequire\("([^"]+)"\)/g, (_, specifier: string) => {
      const name = `__require${imports.length}`;
      imports.push(`import * as ${name} from ${JSON.stringify(specifier)};`);
      return name;
    });

    return { code: `${imports.join('\n')}\n${body}`, map: null };
  },
});

// tests use `__dirname` to address in-memory fixtures
const injectDirname = (): Plugin => ({
  name: 'openlint:inject-dirname',
  enforce: 'pre',
  transform(code, id) {
    if (!/\/packages\/.*\.ts$/.test(id) || !/\b__dirname\b/.test(code)) {
      return null;
    }

    return { code: `const __dirname = ${JSON.stringify(path.dirname(id))};\n${code}`, map: null };
  },
});

const resolve = (p: string) => path.join(__dirname, p);

const browser: TestProjectInlineConfiguration = {
  extends: false,
  plugins: [hoistRequires(), injectDirname(), nodePolyfills({ exclude: ['fs', 'module'] })],
  resolve: {
    alias: [
      { find: /^@openlint\/openlint-test-utils$/, replacement: resolve('test-utils/browser/index.js') },
      { find: /^@openlint\/openlint-test-utils\/matchers$/, replacement: resolve('test-utils/matchers.ts') },
      { find: /^nimma\/fallbacks$/, replacement: resolve('node_modules/nimma/dist/legacy/cjs/fallbacks/index.js') },
      { find: /^nimma\/legacy$/, replacement: resolve('node_modules/nimma/dist/legacy/cjs/index.js') },
      { find: /^nimma$/, replacement: resolve('node_modules/nimma/dist/legacy/cjs/index.js') },
      { find: /^node-fetch$/, replacement: resolve('__browser__/fetch.js') },
      { find: /^rollup$/, replacement: 'rollup/dist/rollup.browser.js' },
      { find: /^fs$/, replacement: resolve('__browser__/fs.js') },
      { find: /^process$/, replacement: resolve('__mocks__/process.js') },
      { find: /^perf_hooks$/, replacement: resolve('__browser__/perf_hooks.js') },
      { find: /^module$/, replacement: resolve('__browser__/module.js') },
      { find: /^fsevents$/, replacement: resolve('__browser__/fsevents.ts') },
      { find: /^@openlint\/openlint-([a-z-]+)$/, replacement: resolve('packages/$1/src/index.ts') },
    ],
  },
  optimizeDeps: {
    include: [
      '@stoplight/path',
      '@stoplight/types',
      '@stoplight/json',
      '@stoplight/yaml',
      'fetch-mock',
      'memfs',
      'treeify',
      'lodash',
      'rollup/dist/rollup.browser.js',
      '@stoplight/json-ref-readers',
      '@stoplight/json-ref-resolver',
      'dependency-graph',
      '@stoplight/better-ajv-errors',
      'ajv/dist/compile/ref_error',
      'minimatch',
      'validate-npm-package-name',
      'ajv/dist/2020',
      'ajv/dist/compile/names',
      'ajv-formats',
      'ajv-errors',
      'ajv',
      'ajv/dist/2019',
      'ajv-draft-04',
      'leven',
      '@asyncapi/specs',
      'json-schema-traverse',
      'nimma/legacy',
      'nimma/fallbacks',
      'jsonpath-plus',
      'expr-eval-fork',
      'ast-types',
      'astring',
      '@stoplight/ordered-object-literal',
      'reserved',
      'strip-ansi',
      'node-html-parser',
      'chalk',
      'text-table',
      'immer',
      'markdown-escape',
      'xml2js',
      'ajv/dist/runtime/equal',
      'ajv-formats/dist/formats',
      'prettier/standalone',
      'prettier/plugins/babel',
      'prettier/plugins/estree',
      'vite-plugin-node-polyfills/shims/global',
      'vite-plugin-node-polyfills/shims/process',
    ],
  },
  test: {
    name: 'browser',
    globals: false,
    include: ['packages/*/src/**/__tests__/**/*.{test,spec}.ts'],
    exclude: [
      'packages/cli/**',
      'packages/formatters/src/pretty.ts',
      'packages/formatters/src/github-actions.ts',
      'packages/formatters/src/sarif.ts',
      'packages/formatters/src/index.node.ts',
      'packages/ruleset-bundler/src/plugins/commonjs.ts',
      '**/*.node.test.ts',
      '**/node_modules/**',
    ],
    setupFiles: ['./__browser__/setup.ts'],
    browser: {
      enabled: true,
      headless: true,
      screenshotFailures: false,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
};

const { paths } = JSON.parse(fs.readFileSync(resolve('tsconfig.json'), 'utf8')).compilerOptions as {
  paths: Record<string, string[]>;
};

// the same workspace resolution as tsc has, so that the tests run against the sources
const workspaceAliases = Object.entries(paths).map(([find, [replacement]]) => {
  const escaped = find.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
  return find.endsWith('/*')
    ? {
        find: new RegExp(`^${escaped.slice(0, -2)}/(.*)$`),
        replacement: resolve(replacement.replace(/\*$/, '')) + '$1',
      }
    : { find: new RegExp(`^${escaped}$`), replacement: resolve(replacement) };
});

const node: TestProjectInlineConfiguration = {
  extends: false,
  resolve: {
    alias: [
      { find: /^@openlint\/openlint-test-utils$/, replacement: resolve('test-utils/node/index.ts') },
      ...workspaceAliases,
    ],
  },
};

const nodeTest = {
  globals: false,
  environment: 'node' as const,
  setupFiles: ['./test-utils/matchers.ts'],
};

// these packages run against an in-memory fs, see test-utils/node/mock-fs.ts
const MEMFS_PACKAGES = ['rulesets', 'ruleset-bundler'];

export default defineConfig({
  test: {
    projects: [
      browser,
      {
        ...node,
        test: {
          ...nodeTest,
          name: 'node',
          include: ['packages/*/src/**/__tests__/**/*.{test,spec}.ts'],
          exclude: [...MEMFS_PACKAGES.map(name => `packages/${name}/**`), '**/node_modules/**'],
        },
      },
      {
        ...node,
        test: {
          ...nodeTest,
          name: 'node-fs',
          include: MEMFS_PACKAGES.map(name => `packages/${name}/src/**/__tests__/**/*.{test,spec}.ts`),
          setupFiles: [...nodeTest.setupFiles, './test-utils/node/mock-fs.ts'],
        },
      },
    ],
  },
});
