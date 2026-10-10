# Spectral Migration Guide

Migrating from Spectral v6.0 is intended to be as painless as possible, and backwards compatibility should be maintained.

You can continue using `.spectral.yaml` and `extends: "spectral:oas"` will continue to work as expected through v0.x

1. Install OpenLint.

```
yarn add openlint
```

2. Change any commands using `spectral` to use `openlint`. For example:

```bash
openlint lint openapi.yaml
```
