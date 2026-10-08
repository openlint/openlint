# OpenLint

- **Custom Rulesets**: Create custom rules to lint JSON or YAML objects
- **Ready-to-use Rulesets**: Validate and lint **OpenAPI v2, v3.0, v3.1 & v3.2**, **AsyncAPI**, and **Arazzo v1** Documents
- **API Style Guides**: Automated [API Style Guides](https://stoplight.io/api-style-guides-guidelines-and-best-practices?utm_source=github.com&utm_medium=referral&utm_campaign=github_repo_openlint) using rulesets improve consistency across all your APIs
- **Ready-to-use Functions**: Built-in set of functions to help [create custom rules](https://openlint.org/docs/custom-rulesets#adding-rules). Functions include pattern checks, parameter checks, alphabetical ordering, a specified number of characters, provided keys are present in an object, etc.
- **Custom Functions**: Create custom functions for advanced use cases

# Overview

- [OpenLint](#openlint)
- [Overview](#overview)
  - [🧰 Installation](#-installation)
    - [Docker](#docker)
  - [💻 Usage](#-usage)
    - [1. Create a local ruleset](#1-create-a-local-ruleset)
    - [2. Lint](#2-lint)
  - [📖 Documentation](#-documentation)
  - [ℹ️ Support](#ℹ️-support)
  - [🌎 Real-World Rulesets](#-real-world-rulesets)
  - [🏁 Help Others Utilize OpenLint](#-help-others-utilize-openlint)
  - [👏 Contributing](#-contributing)
  - [🎉 Thanks](#-thanks)
  - [📜 License](#-license)

## 🧰 Installation

The easiest way to install OpenLint is to use either [npm](https://www.npmjs.com/):

```bash
npm install -g @openlint/openlint-cli
```

Or [yarn](https://yarnpkg.com/):

```
yarn global add @openlint/openlint-cli
```

There are also [additional installation options](https://openlint.org/docs/installation).

### Docker

<!-- make sure to update the value of `--ruleset` according to the actual location of your ruleset -->

```bash
docker run --rm -it -v $(pwd):/tmp stoplight/openlint lint --ruleset "/tmp/.spectral.yaml" "/tmp/file.yaml"
```

## 💻 Usage

### 1. Create a local ruleset

OpenLint, being a generic YAML/JSON linter, **needs a ruleset** to lint files. A ruleset is a JSON, YAML, or JavaScript/TypeScript file (often the file is called `.openlint.yaml` for a YAML ruleset) that contains a collection of rules, which can be used to lint other JSON or YAML files such as an API description.

To get started, run this command in your terminal to create a `.openlint.yaml` file that uses the OpenLint predefined rulesets based on OpenAPI, Arazzo or AsyncAPI:

```bash
echo 'extends: ["spectral:oas", "spectral:asyncapi", "spectral:arazzo"]' > .openlint.yaml
```

If you would like to create your own rules, check out the [Custom Rulesets](https://openlint.org/docs/01baf06bdd05a-rulesets) page.

### 2. Lint

Use this command if you have a ruleset file in the same directory as the documents you are linting:

```bash
openlint lint myapifile.yaml
```

Use this command to lint with a custom ruleset, or one that's located in a different directory than the documents being linted:

```bash
openlint lint myapifile.yaml --ruleset myruleset.yaml
```

## 📖 Documentation

- [Documentation](https://openlint.org/docs/getting-started/1-concepts.md)
  - [Getting Started](https://openlint.org/docs/getting-started/1-concepts.md) - The basics of OpenLint.
  - [Rulesets](https://openlint.org/docs/01baf06bdd05a-rulesets) - Understand the structure of a ruleset so you can tweak and make your own rules.

Once you've had a look through the getting started material, some of these guides can help you become a power user.

- [Different Workflows](https://openlint.org/docs/guides/1-workflows.md) - When and where should you use OpenLint? Editors, Git hooks, continuous integration, GitHub Actions, wherever you like!
- [Using the command-line interface](https://openlint.org/docs/guides/2-cli.md) - Quickest way to get going with OpenLint is in the CLI.
- [Using the JavaScript API](https://openlint.org/docs/guides/3-javascript.md) - Access the _raw power_ of OpenLint via the JS, or hey, TypeScript if you want.
- [Custom Rulesets](https://openlint.org/docs/guides/4-custom-rulesets.md) - Need something more than the core rulesets provide? Fancy building your own API Style Guide? Learn how to create a custom ruleset.
- [Custom Functions](https://openlint.org/docs/guides/5-custom-functions.md) - Handle more advanced rules, by writing a little JavaScript/TypeScript and calling it as a function.

## ℹ️ Support

If you need help using OpenLint or have any questions, you can use [GitHub Discussions](https://github.com/openlint/openlint/discussions). Why not share your rulesets, or show off tools you've made that use OpenLint.

If you have a bug or feature request, [create an issue for it](https://github.com/openlint/openlint/issues).

## 🌎 Real-World Rulesets

A few noteworthy style guides are:

- [OWASP Top 10](https://apistylebook.stoplight.io/docs/owasp-top-10) - Set of rules to enforce [OWASP security guidelines](https://owasp.org/www-project-api-security/).
- [URL Style Guidelines](https://apistylebook.stoplight.io/docs/url-guidelines) - Set of rules to help developers make better and consistent endpoints.
- [Documentation](https://github.com/stoplightio/openlint-documentation) - Scan an OpenAPI description to make sure you're leveraging enough of its features to help documentation tools like Stoplight Elements, ReDoc, and Swagger UI build the best quality API Reference Documentation possible.

There are also rulesets created by many companies to improve their APIs. You can use these as is to lint your OpenAPI descriptions, or use these as a reference to learn more about what rules you would want in your own ruleset:

- [Adidas](https://github.com/adidas/api-guidelines/blob/master/.spectral.yml) - Adidas were one of the first companies to release their API Style Guide in a written guide _and_ a Spectral ruleset. Lots of good rules to try in here.
- [APIs You Won't Hate](https://github.com/apisyouwonthate/style-guide) - An opinionated collection of rules based on advice in the [APIs You Won't Hate](https://apisyouwonthate.com/) community.
- [Azure](https://github.com/Azure/azure-api-style-guide/blob/main/spectral.yaml) - Ruleset and complimentary style guide for creating OpenAPI 2 or 3 definitions of Azure services.
- [Box](https://github.com/box/box-openapi/blob/main/.spectral.yml) - Lots of [Custom Functions](https://openlint.org/docs/ZG9jOjI1MTkw-custom-functions) being used to enforce good practices that the Box API governance folks are interested in.
- [DigitalOcean](https://github.com/digitalocean/openapi/blob/main/spectral/ruleset.yml) - Keeping their OpenAPI nice and tidy, enforcing use of `$ref` (probably to minimize conflicts), naming conventions for Operation IDs, and all sorts of other handy OpenAPI tips.
- [Tranascom](https://github.com/transcom/mymove/blob/master/swagger-def/.spectral.yml) - Don't even think about using anything other than `application/json`.
- [Zalando](https://apistylebook.stoplight.io/docs/zalando-restful-api-guidelines) - Based on [Zalando's RESTFUL API Guidelines](https://github.com/zalando/restful-api-guidelines), covers a wide-range of API topics such as versioning standards, property naming standards, the default format for request/response properties, and more.

Check out some additional style guides here:

- [Spectral Rulesets by Stoplight](https://github.com/stoplightio/spectral-rulesets)
- [API Stylebook by Stoplight](https://apistylebook.stoplight.io)

## 🏁 Help Others Utilize OpenLint

If you're using OpenLint for an interesting use case, create an issue with details on how you're using it. We'll add it to a list here. Spread the goodness 🎉

- [Bank API 🏦](https://github.com/erwinkramer/bank-api?tab=readme-ov-file#bank-api) - The Bank API is a design reference project suitable to bootstrap development for a compliant and modern API. Built in ASP.NET Core and fully complies to multiple OpenLint rulesets, such as "OWASP Top 10", "Dutch Public Sector (NLGov) REST API Design Rules" and more. Built by [Erwin Kramer](https://github.com/erwinkramer).

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

OpenLint is 100% free and open-source, under [Apache License 2.0](LICENSE).
