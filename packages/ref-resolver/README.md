# @openlint/openlint-ref-resolver

This package provides Spectral-compatible bindings for [@stoplight/json-ref-resolver](https://github.com/stoplightio/json-ref-resolver) and [@stoplight/json-ref-readers](https://github.com/stoplightio/json-ref-readers).

You shouldn't need to install this package directly unless you want to create a custom JSON refs resolver

## Installation

```bash
npm install --save @openlint/openlint-ref-resolver

# OR

yarn add @openlint/openlint-ref-resolver
```

## Usage

An example usage of spectral-ref-resolver together with [proxy-agent](https://www.npmjs.com/package/proxy-agent).

```js
import { createHttpAndFileResolver, Resolver } from '@openlint/openlint-ref-resolver';
import ProxyAgent from import('proxy-agent');

module.exports = createHttpAndFileResolver({ agent: new ProxyAgent(process.env.PROXY) });
```
