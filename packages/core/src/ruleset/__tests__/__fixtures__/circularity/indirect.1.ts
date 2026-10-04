import parentRuleset from './indirect.2';
import { falsy } from '@openlint/openlint-functions';
import { RulesetDefinition } from '@openlint/openlint-core';

const ruleset: RulesetDefinition = {
  extends: parentRuleset,
  rules: {
    'foo-rule': {
      given: '$',
      then: {
        function: falsy,
      },
    },
  },
};

export { ruleset as default };
