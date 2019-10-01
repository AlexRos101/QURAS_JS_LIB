---
id: api-api
title: API
---

The API module is exposed as:

```js
import QurasLib from 'quras-js'
QurasLib.get.balance('TestNet', address)
QurasLib.get.tokenBalance(contractScriptHash)

import { api } from 'quras-js'
api.qurasDB.getBalance('TestNet', address)
api.cmc.getPrice()
api.sendAsset(config)
```

The `api` module contains all 3rd party API that is useful together with QurasLib. The main highlight is the qurasDB API which provides the necessary information to construct a ClaimTransaction or ContractTransaction. A normal QURAS node does not provide us with a convenient way of retrieving the balance or claimable transactions through RPC.

However, do note that these APIs rely on hosted nodes by 3rd party and thus use them at your own risk.

This module is structured slightly different from the rest of the modules. While the rest of the modules are flat in terms of hierachy, this module is composed of largely many other submodules. Only the core methods are found at the top level of the module.

## Core

These are core methods that help to tie up the different 3rd party APIs in order to simplify transaction creation and sending.

`core` methods are exposed at the top level of `api`. The 3 high level methods are:

1. `claimGas` - not implemented
2. `sendAsset` - implemented
3. `doInvoke` - implemented

```js
import QurasLib from 'quras-js'
const config = {
  net: 'TestNet'
  address: 'DdMKz4NPardpaUqNVG7tfj9PgDNoD9zr9c',
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

These methods are the core functionality that `quras-js` will maintain. There is in built API selection that will choose the more reliable API between qurasDB and qurasIO based on past transactions.

The methods revolve around passing an configuration object containing all information down the chain. Each method digests the necessary information within the configuration object to perform its task and pass down the configuration object with new information added to it.

## QurasDB

The `qurasDB` API is exposed as:

```js
import QurasLib from 'quras-js'
QurasLib.get.balance('TestNet', address)
QurasLib.do.claimAllGas('TestNet', privateKey)

import {api} from 'quras-js'
api.qurasDB.getBalance('TestNet', address)
api.qurasDB.doClaimAllGas('TestNet', privateKey)
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