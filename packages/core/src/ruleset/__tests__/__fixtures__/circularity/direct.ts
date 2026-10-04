import { falsy } from '@openlint/openlint-functions';

const ruleset = {
  get extends() {
    return ruleset;
  },
  rules: {
    'foo-rule': {
      given: '$',
      then: {
        function: falsy,
      },
    },
  },
};

export { ruleset as default };
