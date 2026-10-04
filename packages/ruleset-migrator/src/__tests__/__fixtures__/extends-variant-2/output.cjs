const { asyncapi, oas } = require('@openlint/openlint-rulesets');
module.exports = {
  extends: [oas, asyncapi],
};
