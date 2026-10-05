import { vol } from 'memfs';
import * as path from '@stoplight/path';
import { format as prettierFormat } from 'prettier/standalone';
import * as parserBabel from 'prettier/plugins/babel';
import * as parserEstree from 'prettier/plugins/estree';
import { Ruleset } from '@openlint/openlint-core';
import { DiagnosticSeverity } from '@stoplight/types';
import fetchMockLib, { FetchMock as FetchMockInstance } from 'fetch-mock';
import { serveAssets } from '@openlint/openlint-test-utils';

import { migrateRuleset } from '..';
import fixtures from './__fixtures__/.cache/index.json';

const cwd = '/.tmp/openlint';

vol.fromJSON(fixtures, cwd);

afterAll(() => {
  vol.reset();
});

type FetchFn = (
  input: Parameters<typeof globalThis.fetch>[0],
  init?: Parameters<typeof globalThis.fetch>[1],
) => ReturnType<typeof globalThis.fetch>;

type FetchMockSandbox = FetchMockInstance & FetchFn;

function createFetchMockSandbox(): FetchMockSandbox {
  const instance = fetchMockLib.createInstance();
  const sandbox = instance.fetchHandler as FetchMockSandbox;
  Object.setPrototypeOf(sandbox, instance);
  return sandbox;
}

const scenarios = Object.keys(fixtures)
  .filter(key => path.basename(key) === 'output.mjs')
  .map(key => path.dirname(key));

describe('migrator', () => {
  describe.each<string>(scenarios)('%s', name => {
    const dir = path.join(cwd, name);
    const ruleset = path.join(dir, 'ruleset');

    it.each<[format: 'commonjs' | 'esm', ext: string]>([
      ['commonjs', '.cjs'],
      ['esm', '.mjs'],
    ])('given %s format, should generate a valid bundle', async (format, ext) => {
      expect(
        await prettierFormat(
          await migrateRuleset(ruleset, {
            format,
            fs: vol as any,
          }),
          { parser: 'babel', plugins: [parserEstree, parserBabel] },
        ),
      ).toEqual(await vol.promises.readFile(path.join(dir, `output${ext}`), 'utf8'));
    });
  });

  it('should support subsequent migrations', async () => {
    await vol.promises.writeFile(
      path.join(cwd, 'ruleset-migration-1.json'),
      JSON.stringify({
        extends: ['./ruleset-migration-2.json'],
        rules: {
          'valid-type': 'error',
        },
      }),
    );

    await vol.promises.writeFile(
      path.join(cwd, 'ruleset-migration-2.json'),
      JSON.stringify({
        extends: 'spectral:oas',
        rules: {
          'valid-type': {
            given: '$',
            then: {
              function: 'truthy',
            },
          },
        },
      }),
    );

    const _module: { exports?: any } = {};

    await (async () => void 0).constructor(
      'module, require',
      await migrateRuleset(path.join(cwd, 'ruleset-migration-1.json'), {
        format: 'commonjs',
        fs: vol as any,
      }),
    )(_module, (id: string): unknown => {
      switch (id) {
        case '@openlint/openlint-functions':
          return require('@openlint/openlint-functions') as unknown;
        case '@openlint/openlint-rulesets':
          return require('@openlint/openlint-rulesets') as unknown;
        default:
          throw new ReferenceError(`${id} not found`);
      }
    });

    const ruleset = new Ruleset(_module.exports);

    expect(Object.keys(ruleset.rules)).toEqual([
      ...Object.keys(require('@openlint/openlint-rulesets').oas.rules),
      'valid-type',
    ]);

    expect(ruleset.rules['valid-type'].severity).toEqual(DiagnosticSeverity.Error);
  });

  it('should accept custom fetch implementation', async () => {
    const fetch = createFetchMockSandbox();

    await vol.promises.writeFile(
      path.join(cwd, 'ruleset.json'),
      JSON.stringify({
        extends: ['https://mock.openlint.org/ruleset'],
        rules: {
          'valid-type': 'error',
        },
      }),
    );

    fetch.get('https://mock.openlint.org/ruleset', {
      body: {
        rules: {
          'valid-type': {
            given: '$',
            function: {
              then: 'truthy',
            },
          },
        },
      },
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });

    expect(
      await migrateRuleset(path.join(cwd, 'ruleset.json'), {
        format: 'esm',
        fs: vol as any,
        fetch,
      }),
    ).toEqual(`export default {
  "extends": [{
    "rules": {
      "valid-type": {
        "given": "$",
        "function": {
          "then": "truthy"
        }
      }
    }
  }],
  "rules": {
    "valid-type": "error"
  }
};
`);
  });

  it('given an unknown format, should not throw', async () => {
    await vol.promises.writeFile(path.join(cwd, 'unknown-format.json'), `{ "formats": ["json-schema-draft-2"] }`);
    await expect(
      migrateRuleset(path.join(cwd, 'unknown-format.json'), {
        format: 'esm',
        fs: vol as any,
      }),
    ).resolves.toEqual(`import {jsonSchemaDraft2} from "@openlint/openlint-formats";
export default {
  "formats": [jsonSchemaDraft2]
};
`);
  });

  it('should follow links correctly', async () => {
    serveAssets({
      'http://domain/bitbucket/projects/API/repos/openlint-rules/raw/.spectral.yml?at=refs%2Fheads%2Fmaster': {
        extends: ['spectral:oas', 'oas-rules.yml'],
        rules: {
          'valid-type': 'error',
        },
      },
      'http://domain/bitbucket/projects/API/repos/openlint-rules/raw/oas-rules.yml': {
        rules: {
          'valid-type': {
            given: '$',
            function: {
              then: 'truthy',
            },
          },
        },
      },
    });

    await vol.promises.writeFile(
      path.join(cwd, 'ruleset.json'),
      JSON.stringify({
        extends: [
          'http://domain/bitbucket/projects/API/repos/openlint-rules/raw/.spectral.yml?at=refs%2Fheads%2Fmaster',
        ],
      }),
    );

    expect(
      await migrateRuleset(path.join(cwd, 'ruleset.json'), {
        format: 'esm',
        fs: vol as any,
      }),
    ).toEqual(`import {oas} from "@openlint/openlint-rulesets";
export default {
  "extends": [{
    "extends": [oas, {
      "rules": {
        "valid-type": {
          "given": "$",
          "function": {
            "then": "truthy"
          }
        }
      }
    }],
    "rules": {
      "valid-type": "error"
    }
  }]
};
`);
  });

  it('should use Content-Type detection', async () => {
    const fetch = createFetchMockSandbox();

    await vol.promises.writeFile(
      path.join(cwd, 'ruleset.json'),
      JSON.stringify({
        extends: ['https://mock.openlint.org/ruleset'],
      }),
    );

    fetch.get('https://mock.openlint.org/ruleset', {
      body: `export default { rules: {} }`,
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
      },
    });

    expect(
      await migrateRuleset(path.join(cwd, 'ruleset.json'), {
        format: 'esm',
        fs: vol as any,
        fetch,
      }),
    ).toEqual(`import ruleset_ from "https://mock.openlint.org/ruleset";
export default {
  "extends": [ruleset_]
};
`);
  });

  describe('custom npm registry', () => {
    it('should be supported', async () => {
      serveAssets({
        'https://unpkg.com/custom-npm-ruleset': {
          functions: ['test'],
          rules: {
            rule2: {
              then: {
                given: '$',
                function: 'test',
              },
            },
          },
        },
      });
      await vol.promises.writeFile(
        path.join(cwd, 'custom-npm-provider.json'),
        JSON.stringify({
          extends: ['custom-npm-ruleset'],
          formats: ['oas2'],
          rules: {
            rule: {
              then: {
                given: '$',
                function: 'truthy',
              },
            },
          },
        }),
      );
      expect(
        await migrateRuleset(path.join(cwd, 'custom-npm-provider.json'), {
          format: 'esm',
          fs: vol as any,
          npmRegistry: 'https://unpkg.com/',
        }),
      ).toEqual(`import {oas2} from "https://unpkg.com/@openlint/openlint-formats";
import {truthy} from "https://unpkg.com/@openlint/openlint-functions";
import test from "https://unpkg.com/custom-npm-ruleset/functions/test.js";
export default {
  "extends": [{
    "rules": {
      "rule2": {
        "then": {
          "given": "$",
          "function": test
        }
      }
    }
  }],
  "formats": [oas2],
  "rules": {
    "rule": {
      "then": {
        "given": "$",
        "function": truthy
      }
    }
  }
};
`);
    });

    it('should not apply to custom functions', async () => {
      await vol.promises.writeFile(
        path.join(cwd, 'custom-npm-provider-custom-functions.json'),
        JSON.stringify({
          functions: ['customFunction'],
          rules: {
            rule: {
              then: {
                given: '$',
                function: 'customFunction',
              },
            },
          },
        }),
      );
      expect(
        await migrateRuleset(path.join(cwd, 'custom-npm-provider-custom-functions.json'), {
          format: 'esm',
          fs: vol as any,
          npmRegistry: 'https://unpkg.com/',
        }),
      ).toEqual(`import customFunction from "/.tmp/openlint/functions/customFunction.js";
export default {
  "rules": {
    "rule": {
      "then": {
        "given": "$",
        "function": customFunction
      }
    }
  }
};
`);
    });

    it('should not apply to custom functions living outside of cwd', async () => {
      await vol.promises.writeFile(
        path.join(cwd, 'custom-npm-provider-custom-functions.json'),
        JSON.stringify({
          functionsDir: '../fns',
          functions: ['customFunction'],
          rules: {
            rule: {
              then: {
                given: '$',
                function: 'customFunction',
              },
            },
          },
        }),
      );

      expect(
        await migrateRuleset(path.join(cwd, 'custom-npm-provider-custom-functions.json'), {
          format: 'esm',
          fs: vol as any,
          npmRegistry: 'https://unpkg.com/',
        }),
      ).toEqual(`import customFunction from "/.tmp/fns/customFunction.js";
export default {
  "rules": {
    "rule": {
      "then": {
        "given": "$",
        "function": customFunction
      }
    }
  }
};
`);
    });

    it('given commonjs output format, should be unsupported', async () => {
      await expect(
        migrateRuleset(
          path.join(cwd, 'custom-npm-provider-custom-functions.json'),
          // @ts-expect-error: npmRegistry not accepted
          {
            format: 'commonjs',
            fs: vol as any,
            npmRegistry: 'https://unpkg.com/',
          },
        ),
      ).rejects.toThrowError("'npmRegistry' option must not be used with commonjs output format.");
    });
  });
});
