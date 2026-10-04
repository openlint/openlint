import { RulesetDefinition } from '@openlint/openlint-core';

import _scope from './scope';

export { ruleset as default };

const ruleset: RulesetDefinition = {
  extends: [
    [_scope, 'all'],
  ],
};