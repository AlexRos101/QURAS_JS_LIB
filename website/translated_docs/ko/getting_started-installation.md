---
id: installation
title: Installation
---

`quras-js` 서고는 NPM서고로서 Quras Dev팀에서 개발하는 서고이다.

## 설치방법

서고 설치방법은 다음과 같다.

```sh
npm install quras-js
```

## Import 방법

`quras-js`는 2가지 방식으로 리용될수 있다.

자세한 방법은 api목록에서 구체적으로 보도록 한다.

### 리용법 1 (의미론적 방법)

```js
import QurasLib from 'quras-js'

QurasLib.create.claimTx(...args)
const query = QurasLib.create.query()
```

### 리용법 2 (부분모듈 방법)

```js
import {rpc, tx} from 'quras-js'

QurasLib.tx.createClaimTx(...args)
const query = new rpc.Query()
```

## Require 방법

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

## Web 리용방법

`quras-js`는 web용도 개발되고 있다.
사용법은 다음과 같다.

```html
  <script src="./lib/browser.js"></script>
```
