---
id: installation
title: Installation
---

`quras-js` lives in the NPM system under the organization `Quras Dev`.

## Install

To install

```sh
npm install quras-js
```

## Import

quras-js supports 2 kinds of imports.

A default import will import the semantic version of quras. Use this if you are new or just want the whole package to use.

```js
import QurasLib from 'quras-js'

QurasLib.create.createContractTx(...args)
const query = QurasLib.create.query()
```

Modules are exposed through named imports. This allows more fine grained control and access to individual modules.

```js
import {rpc, tx} from 'quras-js'

QurasLib.tx.createContractTx(...args)
const query = new rpc.Query()
```

## Require

As quras-js package uses ES6 module conventions, `require` will need to specify which module do they want exactly:

```js
var quras-js = require('quras-js')

// Semantic Style by using default import
var Quras = quras-js.default
const query = Quras.create.query()

// Named imports are available too
var wallet = quras-js.wallet
var tx = quras-js.tx

const account = new wallet.Account(privateKey)
```

## Web

quras-js is also packaged for the web. You can add it through a script tag

```html
  <script src="./lib/browser.js"></script>
```

The library will be available as a global variable `QurasLib`. Similar to `require` style, you will have the semantic style under `default` and the rest of the named modules exposed at the same level.
