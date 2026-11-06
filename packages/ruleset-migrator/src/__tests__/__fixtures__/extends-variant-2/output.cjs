const { asyncapi } = require('@openlint/ruleset-spectral-asyncapi');
const { oas } = require('@openlint/ruleset-spectral-oas');
module.exports = {
  extends: [oas, asyncapi],
};
