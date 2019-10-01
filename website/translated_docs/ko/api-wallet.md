---
id: api-wallet
title: Wallet
---

`wallet` 모듈은 다음과 같이 리용할수 있습니다.

```js
import QurasLib from 'quras-js'
const account = QurasLib.create.account(privateKey)
QurasLib.is.address(string)

import {wallet} from 'quras-js'
const account = new wallet.Account(privateKey)
wallet.isAddress(string)
```

`wallet` 모듈은 키생성, 잔고관리 서명과 같은 기능들을 제공하고 있습니다.

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

`Account` 모듈은 키의 각종 형태에 대한 관리를 진행합니다.

```js
  import QurasLib, {wallet} from 'quras-js'

  const a = QurasLib.create.Account('Dqf3UKe1f5FBWduGxHp8RMqP29dL6DgGS1')
  console.log(a.address) // Dqf3UKe1f5FBWduGxHp8RMqP29dL6DgGS1

  const b = new wallet.Account('8acd21064619fb4a8f309ef5eb9f85d913b81bd3b0894962e2974ba3bf821ca6')
  console.log(b.privateKey) // 8acd21064619fb4a8f309ef5eb9f85d913b81bd3b0894962e2974ba3bf821ca6
```

이 클라스를 리용하여 여러가지 키들을 쉽게 변환하여 얻을수 있습니다.

```js
  console.log(a.publicKey) // throws an error
  console.log(b.publicKey) // prints the public key
  console.log(b.address) // prints the address
```

키형태의 우선순위는 다음과 같습니다.

0. encrypted (QEP1)
1. privateKey / QTP1
2. publicKey
3. scriptHash
4. address

`Account` 클라스를 리용하여 키를 생성하는 경우 당신은 우의 우선순위에 따라 여러가지 키들을 생성할수 있습니다.
다시 말하여 우의 우선순위에서 볼때 privateKey로부터 publicKey는 생성할수 있지만 scriptHash로부터 그보다 우선순위가 우인 publicKey나 privateKey는 생성할수 없다는 의미입니다.

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

`Balance` 클라스는 해당 account의 잔고를 보관하고 관리하는 클라스입니다.

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

이 클라스는 Third-Party Api 써버로부터 해당 account의 unspent잔고를 계산하여 잔고를 얻을수 있게 제공하고 있습니다.

### Claims

```ts
class Claims {
  constructor(claims?: Claims)

  address: string
  net: string
  claims: ClaimItem[]
}
```

`Claims` 클라스는 사용자가 QRS코인을 가지고 있는 대가로 지불되는 QRG코인을 받을수 있도록 Tx를 생성하는 기능을 제공합니다.
이 클라스는 Third part Api써버와 련동하여 기능을 수행하게 됩니다.

QURAS 는 QRS코인에 의하여 QRG코인을 생성하게 됩니다.
실례로 QRS코인을 가지고 있으면 QRS액수에 따라서 QRG코인을 분배받게 됩니다.
계산 규칙은 아래와 같습니다.

    claim = ((start - end) * 8 + sysfee) * value

이 클라스는 우의 계산 로직에 따라서 Third Part Api써버와 련동하여 사용자의 사용가능한 QRG코인을 계산하여주는 역활을 수행합니다.

### Wallet

The `Wallet` 클라스는 말그대로 사용자의 account를 보다 편리하게 관리할수 있도록 개발된 클라스입니다.

이 클라스를 리용하는 예제를 소개합니다.

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

## Methods

### Core

Core에 정의된 함수들을 소개합니다.

Core에 정의된 함수들을 리용하여 키 호상간 변환을 보다 효율적으로 진행할수 있도록 제공하고 있습니다.

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

## Verify

또한 이 모듈에서 해당 키형식을 입력받아 실지로 QURAS불록체인에서 제공하는 키형식에 맞는지를 검사할수 있도록 제공하고 있습니다.

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

되돌림값은 bool형입니다.
