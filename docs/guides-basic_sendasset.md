---
id: basic_sendasset
title: Basic - Sending assets
---

This is a basic tutorial to send assets using the `sendAsset` method.

`quras-js` provides out-of-the-box functionality for sending assets, claiming gas and invoking smart contracts. In this tutorial, I will be demonstrating how to use the high level functions to send some native assets.

For clarification, when we talk about assets, we are referring to native assets such as QRS or QRG. QEP1 tokens are not considered assets as they are records within smart contracts. Thus, this is not applicable for sending those tokens.

## Creating the Intent

To send an asset, we first have to create an `Intent`. This intent is represents the instructions to send assets to a specific address.

```js
  import QurasLib, {api} from 'quras-js'

  // We want to send 1 QRS and 1 QRG to DdMKz4NPardpaUqNVG7tfj9PgDNoD9zr9c
  const intent = api.makeIntent({QRS:1, QRG:1}, 'DdMKz4NPardpaUqNVG7tfj9PgDNoD9zr9c')
  console.log(intent) // This is an array of 2 Intent objects, one for each asset
```

To add more intents, simply use the `api.makeIntent` to create them and concatenate them together in a single array.

## Setup the configuration object

`sendAsset` accepts an configuration object that contains all the necessary details to construct the transaction.

```js
const config = {
  net: 'TestNet', // The network to perform the action, MainNet or TestNet.
  address: 'DdMKz4NPardpaUqNVG7tfj9PgDNoD9zr9c',  // This is the address which the assets come from.
  privateKey: '8acd21064619fb4a8f309ef5eb9f85d913b81bd3b0894962e2974ba3bf821ca6',
  intents: intent
}
```

Do make sure that the address and private key matches. These are used to retrieve the balance from 3rd party APIs (qurasDB and qurasIO) and to sign the transaction.

## Send

```js
QurasLib.sendAsset(config)
.then(config => {
  console.log(config.response)
})
.catch(config => {
  console.log(config)
})
```

`sendAsset` automatically does all the work in retrieving the balance, constructing the transaction, signing it and sending it off to the optimal node. When this is done, the promise returns the `config` object. The object is the same object passed in at the beginning with all the additional information used in the process appended to it. For example, the `url` field is the QURAS node that sent the transaction to.

Here, we are interested in the `response` property, which contains the response from the RPC endpoint upon sending the transaction.

```js
{
  result: true,
  txid: '48b83901a827fa343bf0e4d2ea00f4e7bd352ca28285f21e4bad9509f6460348'
}
```

If the transaction is successful, the `txid` is attached in the response. We can take this string and use it in a block explorer to check out our transaction.

## Notes

- The `sendAsset` method is found under the `api` module for named imports.
- This method only accepts one source of assets to send from. This does not support using multiple sources or multi-sig addresses.
- This supports sending assets from a smart contract by setting the `address` field to the contract's address, signing with a private key that is allowed to send from the contract and setting `sendingFromSmartContract` to true in the configuration object.
