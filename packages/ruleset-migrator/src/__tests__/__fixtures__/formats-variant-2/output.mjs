import { asyncapi2, asyncapi3, jsonSchemaLoose, oas2, oas3, oas3_0, oas3_1 } from '@openlint/openlint-formats';
import { truthy } from '@openlint/openlint-functions';
export default {
  formats: [oas2, oas3_1, oas3_0, jsonSchemaLoose],
  rules: {
    test: {
      given: '$',
      formats: [asyncapi2, asyncapi3, oas3, oas3_0, oas3_1],
      then: {
        function: truthy,
      },
    },
  },
};
