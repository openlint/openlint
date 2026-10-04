const { oas2, oas3 } = require('@openlint/openlint-formats');
const { oas } = require('@openlint/openlint-rulesets');
module.exports = {
  overrides: [
    {
      files: ["apis/*.json"],
      extends: oas,
      formats: [oas2, oas3],
    },
  ],
};
