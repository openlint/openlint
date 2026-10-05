import { serveAssets } from '@openlint/openlint-test-utils';
import { fetch } from '@openlint/openlint-runtime';
import * as fs from 'fs';
import { bundleRuleset } from '../index';
import { IO } from '../types';
import { node } from '../presets/node';
import { browser } from '../presets/browser';
import { commonjs } from '../plugins/commonjs';
import { virtualFs } from '../plugins/virtualFs';
import { runtime } from '../presets/runtime';
import { builtins } from '../plugins/builtins';

describe('Ruleset Bundler', () => {
  let io: IO;

  beforeEach(() => {
    io = {
      fs,
      fetch,
    };

    serveAssets({
      '/p/.openlint/my-fn.js': `module.exports = function f() { return [] };`,

      '/p/openlint.js': `import myFn from './.openlint/my-fn.js';

export default {
  rules: {
    rule: {
       given: '$',
       then: { function: myFn },
    }
  },
};`,
    });
  });

  it('given runtime target, should support commonjs', async () => {
    const code = await bundleRuleset('/p/openlint.js', {
      target: 'runtime',
      plugins: [...runtime(io), commonjs()],
    });

    expect(code).toContain(`\tvar myFn = function f() { return [] };

\tvar openlint = {
\t  rules: {
\t    rule: {
\t       given: '$',
\t       then: { function: myFn },
\t    }
\t  },
\t};

\treturn openlint;

})();`);
  });

  it('given browser target, should support commonjs', async () => {
    const code = await bundleRuleset('/p/openlint.js', {
      target: 'browser',
      plugins: [...browser(io), commonjs()],
    });

    expect(code).toContain(`var myFn = function f() { return [] };

var openlint = {
  rules: {
    rule: {
       given: '$',
       then: { function: myFn },
    }
  },
};

export { openlint as default };`);
  });

  it('given node target, should support commonjs', async () => {
    const code = await bundleRuleset('/p/openlint.js', {
      target: 'node',
      plugins: [...node(io), virtualFs(io), commonjs()],
    });

    expect(code).toContain(`var myFn = function f() { return [] };

var openlint = {
  rules: {
    rule: {
       given: '$',
       then: { function: myFn },
    }
  },
};

export { openlint as default };`);
  });

  it('given node target, should support commonjs for remote ruleset with builtin modules', async () => {
    serveAssets({
      'https://tmp/input.js': `var openlintFormats = require('@openlint/openlint-formats');
var openlintFunctions = require('@openlint/openlint-functions');
const ruleset = {
  rules: {
    'my-rule': {
      given: '$',
      then: {
        function: openlintFunctions.schema,
        functionOptions: {
          schema: {
            type: 'object',
          },
        },
      },
    },
  },
};
module.exports = ruleset;
`,
    });

    const code = await bundleRuleset('https://tmp/input.js', {
      target: 'node',
      format: 'commonjs',
      plugins: [builtins(), commonjs(), ...node({ fs, fetch }), virtualFs(io)],
    });

    expect(code).toContain(`const ruleset = {
  rules: {
    'my-rule': {
      given: '$',
      then: {
        function: openlintFunctions.schema,
        functionOptions: {
          schema: {
            type: 'object',
          },
        },
      },
    },
  },
};`);
  });
});
