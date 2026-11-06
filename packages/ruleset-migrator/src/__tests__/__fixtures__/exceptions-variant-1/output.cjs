const { oas } = require('@openlint/ruleset-spectral-oas');
module.exports = {
  extends: oas,
  overrides: [
    {
      files: ["subfolder/one.yaml#"],
      rules: {
        "no-$ref-siblings": "off",
      },
    },
    {
      files: ["/tmp/docs/one.yaml#/info"],
      rules: {
        "info-contact": "off",
        "info-description": "off",
      },
    },
  ],
};
