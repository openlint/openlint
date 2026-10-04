const { truthy } = require('@openlint/openlint-functions');
module.exports = {
  rules: {
    rule: {
      given: '$',
      then: {
        function: truthy,
      },
    },
  },
};
