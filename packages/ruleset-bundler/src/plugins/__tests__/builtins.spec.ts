import * as fs from 'fs';
import { serveAssets } from '@openlint/openlint-test-utils';
import * as runtime from '@openlint/openlint-runtime';
import * as functions from '@openlint/openlint-functions';

function parseBundle(code: string): { declarations: string[]; body: string } {
  const lines = code.split('\n');
  const declarations: string[] = [];
  const bodyLines: string[] = [];
  for (const line of lines) {
    if (/^const [\w$]+ = globalThis\[/.test(line)) {
      declarations.push(line);
    } else {
      bodyLines.push(line);
    }
  }
  return { declarations: declarations.sort(), body: bodyLines.join('\n') };
}

import { BundleOptions, bundleRuleset } from '../../index';
import type { IO } from '../../types';
import { virtualFs } from '../virtualFs';
import { builtins } from '../builtins';

describe('Builtins Plugin', () => {
  let io: IO;
  let randomSpy: jest.SpyInstance;

  beforeEach(() => {
    io = {
      fs,
      fetch: runtime.fetch,
    };

    randomSpy = jest
      .spyOn(Math, 'random')
      .mockReturnValueOnce(0.8229275205939697)
      .mockReturnValueOnce(0.7505242801973444)
      .mockReturnValueOnce(0.5647855410879519);
  });

  afterEach(() => {
    randomSpy.mockRestore();
  });

  describe.each<BundleOptions['target']>(['browser', 'node', 'runtime'])('given %s target', target => {
    it('should inline Spectral packages & expose it to the runtime', async () => {
      serveAssets({
        '/tmp/input.js': `import { schema } from '@openlint/openlint-functions';
import { oas } from '@openlint/openlint-rulesets';

export default {
  extends: [oas],
  rules: {
    'my-rule': {
      given: '$',
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: 'object',
          },
        },
      },
    },
  },
};`,
      });

      const code = await bundleRuleset('/tmp/input.js', {
        format: 'esm',
        target,
        plugins: [builtins(), virtualFs(io)],
      });

      const { declarations, body } = parseBundle(code);
      expect(declarations).toEqual(
        [
          "const alphabetical = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-functions']['alphabetical'];",
          "const arazzo = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-rulesets']['arazzo'];",
          "const asyncapi = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-rulesets']['asyncapi'];",
          "const casing = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-functions']['casing'];",
          "const defined = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-functions']['defined'];",
          "const enumeration = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-functions']['enumeration'];",
          "const falsy = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-functions']['falsy'];",
          "const length = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-functions']['length'];",
          "const oas = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-rulesets']['oas'];",
          "const or = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-functions']['or'];",
          "const pattern = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-functions']['pattern'];",
          "const schema = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-functions']['schema'];",
          "const truthy = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-functions']['truthy'];",
          "const undefined$1 = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-functions']['undefined'];",
          "const unreferencedReusableObject = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-functions']['unreferencedReusableObject'];",
          "const xor = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-functions']['xor'];",
        ].sort(),
      );
      expect(body).toEqual(`

var input = {
  extends: [oas],
  rules: {
    'my-rule': {
      given: '$',
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: 'object',
          },
        },
      },
    },
  },
};

export { input as default };
`);

      expect(
        globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-functions'],
      ).toStrictEqual(functions);
    });

    it('should support overrides', async () => {
      serveAssets({
        '/tmp/input.js': `import { readFile } from '@openlint/openlint-runtime';

readFile();`,
      });

      function readFile(): void {}

      const code = await bundleRuleset('/tmp/input.js', {
        format: 'esm',
        target,
        plugins: [
          builtins({
            '@openlint/openlint-runtime': {
              readFile,
            },
          }),
          virtualFs(io),
        ],
      });

      const { declarations, body } = parseBundle(code);
      expect(declarations).toEqual(
        [
          "const DEFAULT_REQUEST_OPTIONS = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-runtime']['DEFAULT_REQUEST_OPTIONS'];",
          "const PrintStyle = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-runtime']['PrintStyle'];",
          "const decodeSegmentFragment = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-runtime']['decodeSegmentFragment'];",
          "const fetch = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-runtime']['fetch'];",
          "const getClosestJsonPath = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-runtime']['getClosestJsonPath'];",
          "const getEndRef = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-runtime']['getEndRef'];",
          "const isAbsoluteRef = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-runtime']['isAbsoluteRef'];",
          "const printError = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-runtime']['printError'];",
          "const printPath = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-runtime']['printPath'];",
          "const printValue = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-runtime']['printValue'];",
          "const readFile = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-runtime']['readFile'];",
          "const readParsable = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-runtime']['readParsable'];",
          "const safePointerToPath = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-runtime']['safePointerToPath'];",
          "const startsWithProtocol = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-runtime']['startsWithProtocol'];",
          "const traverseObjUntilRef = globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-runtime']['traverseObjUntilRef'];",
        ].sort(),
      );
      expect(body).toBe('\nreadFile();\n');

      expect(
        globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-runtime'],
      ).toStrictEqual({
        ...runtime,
        readFile,
      });
    });

    it('should isolate each instance', async () => {
      serveAssets({
        '/tmp/input.js': `import { readFile } from '@openlint/openlint-runtime';

readFile();`,
      });

      function readFile(): void {}

      function readFile2(): void {}

      await bundleRuleset('/tmp/input.js', {
        format: 'esm',
        target,
        plugins: [
          builtins({
            '@openlint/openlint-runtime': {
              readFile,
            },
          }),
          builtins({
            '@openlint/openlint-runtime': {
              readFile: readFile2,
            },
          }),
          virtualFs(io),
        ],
      });

      expect(
        globalThis[Symbol.for('@stoplight-spectral/builtins')]['822928']['@openlint/openlint-runtime'],
      ).toStrictEqual({
        ...runtime,
        readFile,
      });

      expect(
        globalThis[Symbol.for('@stoplight-spectral/builtins')]['750524']['@openlint/openlint-runtime'],
      ).toStrictEqual({
        ...runtime,
        readFile: readFile2,
      });
    });
  });
});
