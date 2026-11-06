---
title: "OpenAPI Support"
---

Spectral has a built-in [OpenAPI Specification](https://openapis.org/specification) ruleset that you can use to validate your OpenAPI files.

Install `@openlint/ruleset-openapi` and add `extends: "@openlint/ruleset-openapi"` to your ruleset file to apply rules for OpenAPI v2, v3.0, v3.1, and v3.2, depending on the appropriate OpenAPI version (automatically detected through [formats](../getting-started/rulesets.md#formats)).

You can also use `extends: "openlint:openapi"` as a shorthand for this package.

You can see a full list of the rules in this ruleset in [OpenAPI Rules](../reference/openapi-rules.md).

The legacy `spectral:oas` spelling remains available through the separate `@openlint/ruleset-spectral-oas` package.
