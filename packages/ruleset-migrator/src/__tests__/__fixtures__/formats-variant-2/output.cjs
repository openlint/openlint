const { asyncapi2, asyncapi3, jsonSchemaLoose, oas2, oas3, oas3_0, oas3_1 } = require('@openlint/openlint-formats');
const { truthy } = require('@openlint/openlint-functions');
module.exports = {
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
