# Installation

You can install OpenLint using [npm](https://www.npmjs.com/).

To install the [OpenLint CLI client](../guides/2-cli.md), use:

```bash
npm install -g @openlint/openlint-cli
```

Or if you are a [Yarn](https://yarnpkg.com/) user:

```bash
yarn global add @openlint/openlint-cli
```

To consume the [OpenLint Javascript API](../guides/3-javascript.md), use:

```bash
npm install -g @openlint/openlint-core
```

Or if you are a [Yarn](https://yarnpkg.com/) user:

```bash
yarn global add @openlint/openlint-core
```

## Executable Binaries

If you don't have Node.js and/or npm/Yarn, use the standalone packages for [all major platforms](https://github.com/openlint/openlint/releases). The quickest way to install the appropriate package for your operating system is via this shell script:

```bash
curl -L https://raw.github.com/openlint/openlint/main/scripts/install.sh | sh
```

The binaries **don't autoupdate**, so you must run the command again to install new versions.

## Docker

OpenLint is also available as a Docker image, which can be useful if you're contributing code to OpenLint, or you want to integrate it into your CI build, among other things.

If the file you want to lint is on your computer, you'll need to mount the directory where the file resides as a volume:

```bash
# make sure to update the value of `--ruleset` according to the actual location of your ruleset
docker run --rm -it -v $(pwd):/tmp openlint/openlint lint --ruleset "/tmp/.openlint.js" "/tmp/file.yaml"
```

To use the docker image on GitLab you need to set `entrypoint` to `""` like this:

```yml
stages:
  - validate

validate_open-api:
  stage: validate
  image:
    name: openlint/openlint
    entrypoint: [""]
  script:
    - openlint lint file.yaml
```

For more details about `entrypoint: [""]` see [this issue on GitLab](https://gitlab.com/gitlab-org/gitlab-runner/-/issues/2692#note_50147081).
