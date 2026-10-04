import { RulesetDefinition } from '@openlint/openlint-core';
import shared from './shared';

export default {
  extends: [[shared, 'off']],
  rules: {
    'overridable-rule': true,
  },
} as RulesetDefinition;
