import { pattern } from '@openlint/openlint-functions';
import { DiagnosticSeverity } from '@stoplight/types';
import { RulesetDefinition } from '@openlint/openlint-core';

export { ruleset as default };

const ruleset: RulesetDefinition = {
  aliases: {
    infoSection: ['$.info'],
  },
  rules: {
    'check-initial-version': {
      message: 'API version must be 1.0.0',
      given: '#infoSection',
      severity: DiagnosticSeverity.Error,
      then: {
        field: 'version',
        function: pattern,
        functionOptions: {
          match: '^1\\.0\\.0$',
        },
      },
    },
  },
};
