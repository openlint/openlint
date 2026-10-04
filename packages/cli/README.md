# OpenLint CLI

- **Custom Rulesets**: Create custom rules to lint JSON or YAML objects
- **Ready-to-use Rulesets**: Validate and lint **OpenAPI v3.x & v2.x**, **AsyncAPI**, and **Arazzo v1** Documents
- **JSON Path Support**: Use JSON path to apply rules to specific parts of your objects
- **Ready-to-use Functions**: Built-in set of functions to help create custom rules. Functions include pattern checks, parameter checks, alphabetical ordering, a specified number of characters, provided keys are present in an object, etc.
- **Custom Functions**: Create custom functions for advanced use cases
- **JSON Validation**: Validate JSON with [Ajv](https://www.npmjs.com/package/ajv)

# Overview

- [OpenLint CLI](#openlint-cli)
- [Overview](#overview)
  - [🧰 Installation and Usage](#-installation-and-usage)
  - [📖 Documentation and Community](#-documentation-and-community)
  - [ℹ️ Support](#ℹ️-support)
  - [🏁 Help Others Utilize OpenLint](#-help-others-utilize-openlint)
  - [👏 Contributing](#-contributing)
  - [🎉 Thanks](#-thanks)
  - [📜 License](#-license)

## 🧰 Installation and Usage

**Install**

```bash
npm install -g @openlint/openlint-cli

# OR

yarn global add @openlint/openlint-cli
```

Find more [installation methods](https://openlint.org/docs/getting-started/2-installation.md) in our documentation.

**Lint**

```bash
spectral lint petstore.yaml
```

## 📖 Documentation and Community

Currently the documentation is in `./docs` as we work to get a website together.

## ℹ️ Support

If you need help using Spectral or have a support question, please use [GitHub Discussions](https://github.com/opemlint/openlint/discussions). It's also a great place to share your rulesets, or tools that leverage Spectral.

If you have a bug or feature request, please [create an issue](https://github.com/opemlint/openlint/issues).

## 🏁 Help Others Utilize OpenLint

If you're using OpenLint for an interesting use case, create an issue with details on how you're using it. We'll add it to a list here. Spread the goodness 🎉

## 👏 Contributing

If you are interested in contributing to OpenLint, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## 🎉 Thanks

- [Stoplight.io](https://github.com/stoplightio) for creating, managing, and growing Spectral for years.
- [Mike Ralphson](https://github.com/MikeRalphson) for kicking off the Spectral CLI and his work on Speccy
- [Jamund Ferguson](https://github.com/xjamundx) for JUnit formatter
- [Sindre Sorhus](https://github.com/sindresorhus) for Stylish formatter
- [Ava Thorn](https://github.com/amthorn) for the Pretty formatter
- Julian Laval for HTML formatter
- [@nulltoken](https://github.com/nulltoken) for a whole bunch of amazing features

## 📜 License

Spectral is 100% free and open-source, under [Apache License 2.0](LICENSE).
