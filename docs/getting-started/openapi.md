---
title: "OpenAPI Support"
---

OpenLint has a built-in [OpenAPI Specification](https://openapis.org/specification) ruleset that you can use to validate OpenAPI documents.

Add `extends: "openlint:openapi"` to your ruleset file to apply rules for OpenAPI v2.0, v3.0, v3.1, and v3.2, depending on the appropriate OpenAPI version (automatically detected through [formats](../getting-started/rulesets.md#formats)).

You can see a full list of the rules in this ruleset in [OpenAPI Rules](../reference/openapi-rules.md).

The legacy `spectral:oas` spelling remains available for users [migrating from Spectral](../migration-guides/spectral.mdx).
