import { oas3 } from '@openlint/openlint-formats';
import { truthy } from '@openlint/openlint-functions';
import type { RulesetDefinition } from '@openlint/openlint-core';

export { ruleset as default };

const ruleset: RulesetDefinition = {
  formats: [oas3],
  rules: {
    'oas3-valid-rule': {
      message: 'should be OK',
      given: '$.info',
      then: {
        function: truthy,
      },
    },
  },
};
