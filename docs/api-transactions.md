---
id: api-transactions
title: Transactions
---

The Transactions module is exposed as:

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

Transactions form the core of the interaction with the blockchain. In order to effect any state changes on the chain, a transaction is required to be sent and processed into a block by the consensus nodes.

## Classes

### Transaction

The Transaction class is a wrapper class that contains all the tools required to manipulate and build transactions. This allows us to dynamically add intents, remarks at will instead of cramming everything into a single method.

```js
import QurasLib from 'quras-js'
// Let us create a ContractTransaction
let tx = QurasLib.create.tx({type: 128})
// Now let us add an intention to send 1 QRS to someone
tx
.addOutput('QRS',1,someAddress)
.addRemark('I am sending 1 QRS to someAddress') // Add an remark
.calculate(balance) // Now we add in the balance we retrieve from an external API and calculate the required inputs.
.sign(privateKey) // Sign with the private key of the balance

const hash = tx.hash // Store the hash so we can use it to query a block explorer.

// Now we can use this serializedTx string and send it through sendrawtransaction RPC call.
const serializedTx = tx.serialize()
```

## Methods

### Components

Transactions are composed of the following parts:

1. Type

  This determines the transaction type. This determines how the transaction is serialized or deserialized. Currently, the library only support the following types:

  1. Contract
  2. Claim
  3. Invocation
  4. AnonymousContract

2. Version

  This determines the version of the transaction. Protocol may defer for different versions.

3. Attribute

  Extra attributes that are attached to the transaction. An example is a Remark.

4. Input

  The inputs of the transaction. This is the assets being 'spent' by this transaction. System fees are also included here. Inputs are considered 'spent' after the transaction is processed.


5. Output

  The outputs of the transaction. This indicates the unspent assets created by this transaction. These outputs are 'unspent' and can be referenced as inputs in future transactions.

6. Witness

  The witnesses to the transaction. These are the signatures to authorise the transaction. Usually the private key of the owner of the input assets is used to generate the signature.

7. Exclusive Data (unique to each transaction type)

  Various data required for each transaction. For example, a ClaimTransaction will have the ``claims`` field which contains all claimable transactions. An InvocationTransaction will have the ``script`` field instead for smart contract invocation.

## Fees

Attaching fees is supported as the last argument in both creating transactions and also calculating. Fees work by having more QRG inputs than outputs. The difference between the inputs and the outputs are taken as fees. Fees first contribute towards system fees (eg. transaction costs, etc). Any excess will be considered as network fees and are used to prioritise transactions.

```js
import {tx} from 'quras-js'

// This attaches a fee of 1 QRG.
tx.Transaction.createContractTx(balances, intents, {}, 1)

// Another way is to attach fees on calculation
var newTx = new tx.Transaction()
newTx.addIntent({})
.calculate(balance, null, 1)

```
