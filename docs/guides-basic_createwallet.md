---
id: basic_createwallet
title: Basic - Creating wallet
---

In this lesson, we will show you how to create your wallet.
QURAS wallet contains Private Key, Public Key, ScriptHash and Address.

You can create or use your wallet using this `quras-js` module.
Let's see how to create and use this wallet.

## Create Wallet

`quras-js` module supports class about using wallet.
Then let's see this example.

```js
  import * as Quras from 'quras-js'
  const myAccount = new Quras.wallet.Account()

  console.log('Private Key : ' + myAccount.privateKey) // The private key will be shown.
  console.log('Public Key : ' + myAccount.publicKey) // The public key will be shown.
  console.log('Address : ' + myAccount.address) // The address of you wallet will be shown.
  console.log('Script Hash : ' + myAccount.scriptHash) // The script hash will be shown.
```

You can use this class like this above.