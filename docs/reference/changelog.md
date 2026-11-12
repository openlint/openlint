---
title: "Changelog"
---

OpenLint is released as a set of npm packages. Here's where to find what changed.

## Releases

**[GitHub Releases](https://github.com/openlint/openlint/releases)** has one entry per CLI version (`openlint@x.y.z`). Each one sums up everything in that release across all packages, including the rulesets, with migration notes when something changes the results you get.

## Per-package changelogs

Every package also has its own changelog, generated from commit messages at release time:

| Package | Changelog |
|---|---|
| `openlint` (the CLI) | [packages/cli/CHANGELOG.md](https://github.com/openlint/openlint/blob/main/packages/cli/CHANGELOG.md) |
| `@openlint/openlint-core` | [packages/core/CHANGELOG.md](https://github.com/openlint/openlint/blob/main/packages/core/CHANGELOG.md) |
| `@openlint/openlint-functions` | [packages/functions/CHANGELOG.md](https://github.com/openlint/openlint/blob/main/packages/functions/CHANGELOG.md) |
| `@openlint/openlint-formats` | [packages/formats/CHANGELOG.md](https://github.com/openlint/openlint/blob/main/packages/formats/CHANGELOG.md) |
| `@openlint/openlint-formatters` | [packages/formatters/CHANGELOG.md](https://github.com/openlint/openlint/blob/main/packages/formatters/CHANGELOG.md) |
| `@openlint/openlint-parsers` | [packages/parsers/CHANGELOG.md](https://github.com/openlint/openlint/blob/main/packages/parsers/CHANGELOG.md) |
| `@openlint/openlint-rulesets` | [packages/rulesets/CHANGELOG.md](https://github.com/openlint/openlint/blob/main/packages/rulesets/CHANGELOG.md) |

## Rulesets

Since 1.2.0, each core ruleset lives in its own repo, with its own releases:

- `openlint:openapi`, `openlint:asyncapi`, `openlint:arazzo`: [ruleset-openapi](https://github.com/openlint/ruleset-openapi), [ruleset-asyncapi](https://github.com/openlint/ruleset-asyncapi), [ruleset-arazzo](https://github.com/openlint/ruleset-arazzo). These evolve, and can change between minor releases while they settle.
- `spectral:oas`, `spectral:asyncapi`, `spectral:arazzo`: [ruleset-spectral-oas](https://github.com/openlint/ruleset-spectral-oas), [ruleset-spectral-asyncapi](https://github.com/openlint/ruleset-spectral-asyncapi), [ruleset-spectral-arazzo](https://github.com/openlint/ruleset-spectral-arazzo). These are frozen copies of the Spectral rulesets.
- Opt-in: [ruleset-documentation](https://github.com/openlint/ruleset-documentation).

## Project news

The [OpenLint changelog](https://openlint.org/changelog/) lists what changed across the whole project each week, including releases, and the [roadmap](https://openlint.org/roadmap/) shows what's next.
