import { RulesetDefinition } from '@openlint/openlint-core';

export default {
  extends: [],
  parserOptions: {
    incompatibleValues: 'off',
    duplicateKeys: 'warn',
  },
} as RulesetDefinition;
