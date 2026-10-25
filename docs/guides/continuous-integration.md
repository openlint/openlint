---
title: "Continuous Integration"
---

OpenLint runs in CI the do-it-yourself way: install Node.js and run the `openlint` package from npm. Any CI service that can run Node.js can run it.

## What exists today

|                                                                  | Status                                                                                                                                                               |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| npm package [`openlint`](https://www.npmjs.com/package/openlint) | Published. Needs Node.js 22, or 24 and later.                                                                                                                        |
| Docker image                                                     | None published. The repository has a [`Dockerfile`](https://github.com/openlint/openlint/blob/main/Dockerfile) you can build yourself (see [Docker](#docker) below). |
| GitHub Action                                                    | None. Run the npm package in a workflow step instead (see [GitHub Actions](#github-actions) below).                                                                  |
| Plugins or orbs for other CI services                            | None. Each example below is plain configuration.                                                                                                                     |

## Before you start: a ruleset

OpenLint will not lint without a ruleset. Commit a `.openlint.yaml` (or `.openlint.json` or `.openlint.js`) to the root of your repository, or point to one with `--ruleset`. To start with the built-in OpenAPI rules:

```yaml
extends: ["spectral:oas"]
```

Without a ruleset, `openlint lint` prints "No ruleset has been found" and lints nothing. See [Rulesets](../getting-started/rulesets.md) for the other built-in rulesets.

## The examples

Every example lints `openapi.yaml`. Change it to the documents you want to lint.

The examples use `-f junit -o <file>` to write the results in the JUnit format, which most CI services can show as test results. Drop those two options to print the results in the build log instead.

## GitHub Actions

Save this as `.github/workflows/openlint.yml`:

```yaml
name: OpenLint

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 24
      - run: npx --yes openlint lint openapi.yaml
```

## CircleCI

Save this as `.circleci/config.yml`, or move the `lint` job into your existing config:

```yaml
version: 2.1

jobs:
  lint:
    docker:
      - image: cimg/node:lts
    steps:
      - checkout
      - run: mkdir -p lint-results
      - run:
          name: Run OpenLint
          command: npx --yes openlint lint openapi.yaml -f junit -o lint-results/junit.xml
      - store_test_results:
          path: lint-results

workflows:
  lint:
    jobs:
      - lint
```

Learn more about [CircleCI configuration](https://circleci.com/docs/config-intro/).

## GitLab

Add this to your `.gitlab-ci.yml`:

```yaml
stages:
  - lint

lint:openlint:
  stage: lint
  image: node:24
  script:
    - npx --yes openlint lint -D -f junit -o openlint-report.xml openapi.yaml
  artifacts:
    when: always
    expire_in: 2 weeks
    reports:
      junit: $CI_PROJECT_DIR/openlint-report.xml
```

`-D` (`--display-only-failures`) leaves warnings and hints out of the report. With the JUnit report, the results show on the merge request page.

## Docker

There is no published image, so build one from the repository's `Dockerfile`. It installs the `openlint` release named in `packages/cli/package.json`:

```bash
git clone https://github.com/openlint/openlint.git
cd openlint
docker build --build-arg NODE_VERSION=$(cat .nvmrc) -t openlint .
docker run --rm -v "$(pwd):/work" -w /work openlint lint openapi.yaml
```

Push the image to your own registry if your CI jobs need to pull it.
