import { length as length$0, truthy } from '@openlint/openlint-functions';
export default {
  rules: {
    rule: {
      given: '$',
      then: {
        function: truthy,
      },
    },
    'valid-length': {
      given: '$',
      then: {
        function: length$0,
      },
    },
  },
};
