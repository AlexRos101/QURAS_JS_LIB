---
id: api-wallet
title: Wallet
---

The `wallet` module is exposed as:

```js
import QurasLib from 'quras-js'
const account = QurasLib.create.account(privateKey)
QurasLib.is.address(string)

import {wallet} from 'quras-js'
const account = new wallet.Account(privateKey)
wallet.isAddress(string)
```

The `wallet` module contains the core methods for manipulating keys, creating signatures and verifying keys.

## Classes
### Account

```ts
class Account {
  constructor(str: string)

  QTP1: string
  privateKey: string
  publicKey: string
  scriptHash: string
  address: string

  getPublicKey(encoded: boolean): string
}
```

The `Account` class is used to store and transform keys to its various formats.

```js
  import QurasLib, {wallet} from 'quras-js'

  const a = QurasLib.create.Account('Dqf3UKe1f5FBWduGxHp8RMqP29dL6DgGS1')
  console.log(a.address) // Dqf3UKe1f5FBWduGxHp8RMqP29dL6DgGS1

  const b = new wallet.Account('8acd21064619fb4a8f309ef5eb9f85d913b81bd3b0894962e2974ba3bf821ca6')
  console.log(b.privateKey) // 8acd21064619fb4a8f309ef5eb9f85d913b81bd3b0894962e2974ba3bf821ca6
```

The class enables us to easily retrieve keys in any derivable format without needing to remember any methods. However, we can only retrieve formats that can be derived from our input.

```js
  console.log(a.publicKey) // throws an error
  console.log(b.publicKey) // prints the public key
  console.log(b.address) // prints the address
```

The order of the keys are:

0. encrypted (QEP1)
1. privateKey / QTP1
2. publicKey
3. scriptHash
4. address

When you instantiate an `Account` with a key, you can retrieve any format that is below it in the list.

The Account class can be instantiated from encrypted key, private key, public key, address or ScriptHash.

### Balance

```ts
class Balance {
  constructor(bal?: Balance)

  address: string
  net: 'MainNet' | 'TestNet'
  assetSymbols: string[]
  assets: { [index: string]: AssetBalance }
  tokenSymbols: string[]
  tokens: { [index: string]: number }

  static import(jsonString: string): Balance
  export(): string
}
```

The Balance class stores the balance of the account. It is usually retrieved using a 3rd party API as QURAS nodes do not have a RPC call to easily retrieve this information with a single call.

```js
import QurasLib from 'quras-js'
// This creates a balance object but it is empty and not really useful
QurasLib.create.balance({net: 'TestNet', address: 'DdMKz4NPardpaUqNVG7tfj9PgDNoD9zr9c'})

import {wallet, api} from 'quras-js'
// This form is useless as it is an empty balance.
const balance = new wallet.Balance({net: 'TestNet', address: 'DdMKz4NPardpaUqNVG7tfj9PgDNoD9zr9c'})
// We get a useful balance that can be used to fill a transaction through api.qurasDB
const filledBalance = api.qurasDB.getBalance('MainNet','DdMKz4NPardpaUqNVG7tfj9PgDNoD9zr9c')
// This contains all symbols of assets available in this balance
const symbols = filledBalance.assetSymbols
// We retrieve the unspent coins from the assets object using the symbol
const qrsCoins = filledBalance.assets['QRS'].unspent
// We can verify the information retrieved using verifyAssets
filledBalance.verifyAssets('https://{Quras Node IP}:{Port}') // Not implemented.
```

The class is used to track the unspent coins available to construct transactions with.

The constructor is a handy method to convert a Balance-like javascript object into a `quras-js` Balance.

### Claims

```ts
class Claims {
  constructor(claims?: Claims)

  address: string
  net: string
  claims: ClaimItem[]
}
```

The Claims class is a collection of claims data belonging to an account. It is usually retrieved from a 3rd part API. We do not recommend you craft your own Claims manually. This class is here for completeness in terms of high level objects.

QURAS generates GAS when held. When QURAS is spent, the gas that it generates is unlocked and made claimable through ClaimTransaction. The formula for calcuating the claim per transaction is:

    claim = ((start - end) * 8 + sysfee) * value

### Wallet

The `Wallet` class implements the QEP1 convention which is a standard way set by QURAS council on how to export keys in a JSON file. By doing this, we can move keys across different software providers without worry.

The `Wallet` class is essentially a collection of encrypted keys as well as the parameters used to encrypt them.

```js
import QurasLib, {wallet} from 'quras-js'

const b = new wallet.Account('8acd21064619fb4a8f309ef5eb9f85d913b81bd3b0894962e2974ba3bf821ca6')

// We create a wallet with name 'myWallet'. This is optional. The constructor is fine with no arguments.
const w1 = QurasLib.create.wallet({name: 'myWallet'})

// We generate a new Account and add it to the wallet
w1.addAccount()
// We add Account a to the wallet.
// The wallet will only error when trying to export an unencrypted key but does not prevent you from adding it.
w1.addAccount(a)
```

If your Account is not encrypted, it is still possible to add it to the Wallet.

## Methods

### Core

The core methods available are methods to convert key formats and generate new private keys.

Do note that the methods available is not the full set but only the minimum required. Generally, there is a method to retrieve the lower key from the higher key. For example, `getPublicKeyFromPrivateKey` exists but not `getAddressFromPrivatKey` or `getPrivateKeyFromPublicKey`. For conversions across all formats, you are encouraged to use the `Account` class.

```js
import QurasLib from 'quras-js'
const privateKey = QurasLib.create.privateKey()
const publicKey = QurasLib.get.publicKeyFromPrivateKey(publicKey)
const scriptHash = QurasLib.get.scriptHashFromPublicKey(publicKey)
const address = QurasLib.get.addressFromScriptHash(scriptHash)

import { wallet } from 'quras-js'
const privateKey = wallet.generatePrivateKey()
const publicKey = wallet.getPublicKeyFromPrivateKey(privateKey)
const scriptHash = wallet.getScriptHashFromPublicKey(publicKey)
const address = wallet.getAddressFromScriptHash(scriptHash)
```

There are no checks in place for this set of methods to ensure the inputs are proper. Errors may be thrown when conversion fails for certain methods.

### Components

These are methods used to convert JS objects into their respective `quras-js` implementation.

These methods are exposed for completeness but you are encouraged to use the constructors of the main objects `Balance` and `Claims` instead of manually recreating your own objects.

## Verify

Verification methods for the various key formats are available::

```js
import QurasLib from 'quras-js'
QurasLib.is.address(addrStr)
QurasLib.is.privateKey(keyStr)
QurasLib.is.encryptedKey(encryptedStr)
QurasLib.is.publicKey(publicKeyStr)
QurasLib.is.MTP1(qtp1Str)
QurasLib.is.scriptHash(scriptHashStr)

import {wallet} from 'quras-js'
wallet.isAddress(addrStr)
wallet.isPrivateKey(keyStr)
wallet.isQEP1(keyStr)
wallet.isPublicKey(publicKeyStr)
wallet.isQTP1(qtp1Str)
wallet.isScriptHash(scriptHashStr)
```

These methods will return a boolean regarding the key format. No errors will be thrown.
