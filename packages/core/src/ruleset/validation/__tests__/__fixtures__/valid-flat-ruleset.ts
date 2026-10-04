import { truthy } from '@openlint/openlint-functions';

export default {
  rules: {
    'valid-rule': {
      given: '$.info',
      then: {
        function: truthy,
      },
    },
  },
};
