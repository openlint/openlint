import { jsonSchemaDraft2019_09, jsonSchemaDraft2020_12 } from '@openlint/openlint-formats';
import { truthy } from '@openlint/openlint-functions';
export default {
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
