import { DiagnosticSeverity } from '@stoplight/types';
import { text } from '../text';

import mixedErrors from './__fixtures__/mixed-errors.json';

describe('Text formatter', () => {
  test('should format messages', () => {
    const result = text(mixedErrors, { failSeverity: DiagnosticSeverity.Error });
    expect(result)
      .toContain(`/home/openlint/src/__tests__/__fixtures__/petstore.oas3.json:3:10 hint info-contact "Info object should contain \`contact\` object."
/home/openlint/src/__tests__/__fixtures__/petstore.oas3.json:3:10 warning info-description "OpenAPI object info \`description\` must be present and non-empty string."
/home/openlint/src/__tests__/__fixtures__/petstore.oas3.json:5:14 error info-matches-openlint "Info must contain OpenLint"
/home/openlint/src/__tests__/__fixtures__/petstore.oas3.json:17:13 information operation-description "Operation \`description\` must be present and non-empty string."
/home/openlint/src/__tests__/__fixtures__/petstore.oas3.json:64:14 information operation-description "Operation \`description\` must be present and non-empty string."
/home/openlint/src/__tests__/__fixtures__/petstore.oas3.json:86:13 information operation-description "Operation \`description\` must be present and non-empty string."`);
  });
});
