import { RulesetDefinition } from '@openlint/openlint-core';
import shared from './shared';
import { truthy } from '@openlint/openlint-functions/src';

export default {
  extends: [[shared, 'off']],
  rules: {
    'overridable-rule': {
      given: '$.foo',
      then: {
        function: truthy,
      },
    },
  },
} as RulesetDefinition;
