import { DiagnosticSeverity } from '@stoplight/types';
import { pattern } from '@openlint/openlint-functions';
import { RulesetDefinition } from '@openlint/openlint-core';

import _base from './_base';

export { ruleset as default };

const ruleset: RulesetDefinition = {
  extends: _base,
  overrides: [
    {
      files: ['legacy/**/*.json'],
      rules: {
        'value-matches-stoplight': {
          message: 'Value must contain Stoplight',
          given: '$..value',
          severity: DiagnosticSeverity.Error,
          then: {
            field: 'description',
            function: pattern,
            functionOptions: {
              match: 'Stoplight',
            },
          },
        },
      },
    },
  ],
};
