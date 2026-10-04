import { oas2 } from '@openlint/openlint-formats';
import { truthy } from '@openlint/openlint-functions';
import type { RulesetDefinition } from '@openlint/openlint-core';

export { ruleset as default };

const ruleset: RulesetDefinition = {
  formats: [oas2],
  rules: {
    'oas2-valid-rule': {
      message: 'should be OK',
      given: '$.info',
      then: {
        function: truthy,
      },
    },
  },
};

