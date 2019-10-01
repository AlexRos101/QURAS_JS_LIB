---
id: api-index
title: API
---

`quras-js` Module support special functions with QURAS blockchain.

## default

`quras-js` module support default import function as QurasLib.

```js
import QurasLib from 'quras-js'
QurasLib.create.privateKey()
QurasLib.serialize.tx(transactionObj)
QurasLib.get.publicKeyFromPrivateKey(privateKey)
```

## api

The `api` module contains code that interfaces with external APIs as well as providing a high level abstraction.

## wallet

The `wallet` module deals with key manipulating as well as importing and exporting of wallet files.

## tx

The `tx` module deals with transaction creation, serialization and deserialization.

## sc

The `sc` module deals with smart contract script construction. It is used primarily to construct scripts that can be carried by InvocationTransaction.

## rpc

The `rpc` module deals with the RPC interface exposed by the QURAS node.

## u

The `u` module is the utilities module containing methods handling the various data transformation aspects within QURAS.

## CONST

The `CONST` module is a collection of constants and defaults used across all modules.
