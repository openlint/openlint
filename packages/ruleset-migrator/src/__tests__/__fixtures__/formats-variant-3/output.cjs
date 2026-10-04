const { jsonSchemaDraft2019_09, jsonSchemaDraft2020_12 } = require('@openlint/openlint-formats');
const { truthy } = require('@openlint/openlint-functions');
module.exports = {
  formats: [jsonSchemaDraft2019_09, jsonSchemaDraft2020_12],
  rules: {
    test: {
      given: '$',
      then: {
        function: truthy,
      },
    },
  },
};
