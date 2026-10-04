import { oas2, oas3 } from '@openlint/openlint-formats';
import { truthy } from '@openlint/openlint-functions';
import type { RulesetDefinition } from '@openlint/openlint-core';
import oas2Ruleset from './oas2';
import oas3Ruleset from './oas3';

export { ruleset as default };

const ruleset: RulesetDefinition = {
  extends: [oas2Ruleset, oas3Ruleset],
  formats: [oas2, oas3],
  rules: {
    'generic-valid-rule': {
      message: 'should be OK',
      given: '$.info',
      then: {
        function: truthy,
      },
    },
  },
};
