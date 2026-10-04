const { length: length$0, truthy } = require('@openlint/openlint-functions');
module.exports = {
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
