const { pattern } = require('@openlint/openlint-functions');

module.exports = {
  rules: {
    'info-matches-openlint': {
      message: 'Info must contain OpenLint',
      given: '$.info',
      recommended: true,
      type: 'style',
      then: {
        field: 'title',
        function: pattern,
        functionOptions: {
          match: 'OpenLint'
        }
      },
    },
  },
};
