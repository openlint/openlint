const rulesetInvalid = require('./ruleset-invalid');
const { pattern } = require('@openlint/openlint-functions');

module.exports = {
  extends: rulesetInvalid,
  rules: {
    'no-swagger': {
      message: 'Use OpenAPI instead ;)',
      given: '$..*',
      then: {
        function: pattern,
        functionOptions: {
          notMatch: 'Swagger',
        }
      }
    }
  }
}
