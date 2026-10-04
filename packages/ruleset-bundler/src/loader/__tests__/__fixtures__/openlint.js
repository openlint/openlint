import myFn from './.openlint/my-fn.js';
import lowerCase from './.openlint/lower-case.js';
import upperCase from './.openlint/upper-case.js';

export default {
  rules: {
    'odd-rule': {
      given: '$',
      then: { function: myFn },
    },
    'upper-case-rule': {
      given: '$',
      then: { function: upperCase },
    },
    'lower-case-rule': {
      given: '$',
      then: { function: lowerCase },
    },
  },
};
