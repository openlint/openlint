import ruleset from './indirect.1';
import {falsy} from "@openlint/openlint-functions";

export default {
  get extends() {
    return ruleset;
  },
  rules: {
    'baz-rule': {
      given: '$',
      then: {
        function: falsy,
      },
    },
  },
};
