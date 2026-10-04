import { oas3 as oas3$0, oas3_1 } from '@openlint/openlint-formats';
import oas3 from '/.tmp/openlint/functions-variant-4/functions/oas3.js';
export default {
  formats: [oas3$0, oas3_1],
  rules: {
    rule: {
      given: '$',
      then: [
        {
          function: oas3,
        },
      ],
    },
  },
};
