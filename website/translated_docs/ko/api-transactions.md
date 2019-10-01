---
id: api-transactions
title: Transactions
---

Transactions 모듈은 다음과 같이 리용할수 있습니다.

```js
import QurasLib from 'quras-js'
let transaction1 = QurasLib.create.claimTx(...args)
transaction1 = QurasLib.sign.transaction(transaction1, privateKey)
let serialized1 = QurasLib.serialize.tx(transaction1)
let txid1 = QurasLib.get.transactionHash(transaction1)

import { tx } from 'quras-js'
let transaction2 = tx.createClaimTx(...args)
transaction2 = tx.signTransaction(transaction2, privateKey)
let serialized2 = tx.serializeTransaction(transaction2)
let txid2 = tx.getTransactionHash(transaction2)
```

Transactions 모듈은 불록체인의 Transaction관리를 모두 진행합니다. 불록체인의 상태를 변경하려면 트랜잭션이 consensus 노드들에 의하여 불록체 추가되여야 합니다.
Transactions 모듈을 리용하여 Transaction을 생성할수 있습니다.

## 클라스

### Transaction 클라스

Transaction 클라스는 transaction생성과 관리에 필요한 모든 기능들을 다 포함하고 있습니다. 

```js
import QurasLib from 'quras-js'
// ContractTransation생성은 다음과 같이 합니다.
let tx = QurasLib.create.tx({type: 128})
// ContractTransaction을 리용하여 1 QRS를 다른 사람에게 보내는 실례를 보기로 합시다.
tx
.addOutput('QRS',1,someAddress)
.addRemark('I am sending 1 QRS to someAddress') // Add an remark
.calculate(balance) // Now we add in the balance we retrieve from an external API and calculate the required inputs.
.sign(privateKey) // Sign with the private key of the balance

const hash = tx.hash // Store the hash so we can use it to query a block explorer.

// Now we can use this serializedTx string and send it through sendrawtransaction RPC call.
const serializedTx = tx.serialize()
```

## 함수들

### Components

Transaction은 다음과 같은 마당들을 포함하고 있습니다.

1. Type

  이 마당은 Transaction의 형태를 나타냅니다. QURAS 불록체인에서 여러가지 Transaction 형식들이 존재하는데 현재 `quras-js`에서 제공하는 Transaction 형식은 다음과 같습니다.
  - Contract
  - Claim
  - Invocation
  - AnonymousContract
  
2. Version

  이 마당은 Transaction의 version정보를 나타냅니다. 불록체인 갱신시 프로토콜 추가로 인하여 version에 따라 프로토콜들이 달라질수 있습니다.

3. Attribute

  Transaction의 추가적인 마당으로서 Transaction의 속성정보 및 Remark등이 들어가게 됩니다.

4. Input

  이 마당은 Transaction의 입력마당을 나타냅니다. Transaction에 의하여 이 입력마당은 'spent' 로 상태가 바뀌게 됩니다. 수수료도 여기에 포함되게 됩니다. 

5. Output

  이 마당은 Transaction의 출력을 나타냅니다. 즉 다시 말하여 이 Transaction에 의하여 'unspent' 상태의 UTXO가 생성되게 됩니다. 이 'unspent' 출력마당은 다음의 Transaction에서 input마당에 들어가게 됩니다.

6. Witness

  Transaction의 서명과 관련한 마당입니다. Transaction검증을 위한 서명을 나타내는 마당이다. 즉 input마당에 들어간 자산의 private key를 리용하여 서명을 생성하게 된다.

7. Exclusive Data (unique to each transaction type)

  모든 Transaction에 대하여 여러가지 기타 마당들이 존재한다. 실례로 ClaimTransaction은 ``claims``라는 마당이 더 존재하며 InvocationTransaction은 ``script``마당이 더 존재한다.

## 수수료

수수료는 QRG코인으로 지불하게 된다.

```js
import {tx} from 'quras-js'

// This attaches a fee of 1 QRG.
tx.Transaction.createContractTx(balances, intents, {}, 1)

// Another way is to attach fees on calculation
var newTx = new tx.Transaction()
newTx.addIntent({})
.calculate(balance, null, 1)

```
