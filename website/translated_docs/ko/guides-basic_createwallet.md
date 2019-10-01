---
id: basic_createwallet
title: Basic - Creating wallet
---

이 련재에서 어떻게 QURAS용 지갑을 생성할수 있는지에 대해서 보여줄려고 합니다.
QURAS용 지갑이라고 할때 Private Key, Public Key, ScriptHash, Address를 통털어 관리하는것을 의미합니다.
불록체인에서 지갑생성및 관리는 필수입니다.

`quras-js`모듈을 리용하여 편리하게 지갑을 생성 및 관리할수 있습니다.
그러면 어떻게 지갑을 생성하고 리용하는지에 대해서 보기로 합시다.

## 지갑생성

`quras-js`에서 지갑관리용 클라스를 제공하고 있습니다.
그러면 어떻게 지갑을 생성할수 있는지 실례를 통하여 보기로 합시다.

```js
  import * as Quras from 'quras-js'
  const myAccount = new Quras.wallet.Account()

  console.log('Private Key : ' + myAccount.privateKey) // 생성된 Private Key를 현시합니다.
  console.log('Public Key : ' + myAccount.publicKey) // 생성된 Public Key를 현시합니다.
  console.log('Address : ' + myAccount.address) // 생성된 주소를 현시합니다.
  console.log('Script Hash : ' + myAccount.scriptHash) // 생성된 scriptHash를 현시합니다.
```

우의 실례와 같이 지갑주소를 생성하고 관리할수 있습니다.