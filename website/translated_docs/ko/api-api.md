---
id: api-api
title: API
---

`api` 모듈은 다음과 리용될수 있다.

```js
import QurasLib from 'quras-js'
QurasLib.get.balance('TestNet', address)
QurasLib.get.tokenBalance(contractScriptHash)

import { api } from 'quras-js'
api.qurasDB.getBalance('TestNet', address)
api.cmc.getPrice()
api.sendAsset(config)
```

The `api` 모듈은 QurasLib를 통하여 여러가지 API들을 제공한다. QurasLib를 리용하여 사용자들은 QurasDB써버와 련동하여 QURAS불록체인의 Transaction생성과 같은 여러가지 기능들을 리용할수 있다.

여기서 QurasDB는 QURAS불록체인의 FullNode와 련결되여 있는 일종의 써버이다.

## Core

`core` 모듈에서 앞으로 추가될 다른 FullNode들에서 구현해야 할 기본 함수들의 Interface를 구현하고 있다.

`core` 모듈은 아래의 3가지 기본함수를 제공하고 있다.

1. `claimGas` - 구현안됨.
2. `sendAsset` - 구현됨
3. `doInvoke` - 구현됨

```js
import QurasLib from 'quras-js'
const config = {
  net: 'TestNet'
  address: 'ALq7AWrhAueN6mJNqk6FHJjnsEoPRytLdW',
  privateKey: '7d128a6d096f0c14c3a25a2b0c41cf79661bfcb4a8cc95aaaea28bde4d732344'
}
QurasLib.api.claimGas(config)
.then((conf) => {
  console.log(conf.response)
})

import {api} from 'quras-js'
api.claimGas(config)
.then((conf) => {
  console.log(conf.response)
})
```

이 함수들은 `quras-js` 에서 제공하는 core의 기본 함수들이다. 앞으로 `quras-js`에 qurasDB외에 다른 FullNode들을 계속 추가할 예정이며 개발자들은 여러가지 FullNode들을 이 Core모듈의 Interface를 리용하여 간편히 사용하도록 할것이다.

## QurasDB

The `qurasDB` API is exposed as:

```js
import QurasLib from 'quras-js'
QurasLib.get.balance('TestNet', address)

import {api} from 'quras-js'
api.qurasDB.getBalance('TestNet', address)
```

The quasDB API describes the API set exposed by [quras-wallet-db](https://bitbucket.org/qurasblockchain) as well as other convenient methods. The node is hosted by Quras Dev.

The API returns useful information that is not built into standard QURAS nodes such as claimable transactions or spendable coins. These information are used to construct transactions.

For example, the `getBalance` method returns a list of spendable assets of a specific address. This is then used to construct a ContractTransaction.

## CoinMarketCap

A straightforward call to CoinMarketCap API to retrieve the latest price information. This is exposed as `cmc` within `api`.

```js
import QurasLib from 'quras-js'
QurasLib.get.price('QRS', 'EUR')
QurasLib.get.price('QRG') // defaults to USD
QurasLib.get.prices(['QRS', 'QRG'], 'EUR')
QurasLib.get.prices(['QRS', 'QRG']) // defaults to USD

import { api } from 'quras-js'
api.cmc.getPrice('QRS', 'SGD')
api.cmc.getPrices(['QRS', 'QRG'], 'SGD')
```