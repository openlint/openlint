import { oas2, oas3 } from "@openlint/openlint-formats";
import { oas } from "@openlint/ruleset-spectral-oas";
export default {
  overrides: [
    {
      files: ["apis/*.json"],
      extends: oas,
      formats: [oas2, oas3],
    },
  ],
};
