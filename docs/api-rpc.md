---
id: api-rpc
title: RPC
---

The RPC module is exposed as:

```js
import QurasLib from 'quras-js'
const client = QurasLib.create.rpcClient(URL)

import { rpc } from 'quras-js'
const client = new rpc.rpcClient(URL)
```

## Classes

### RPCClient

The RPC Client acts as a model for a specific QURAS Node. RPC Calls are methods which external applications can interact with the QURAS network easily without sending a transaction.

It provides built-in RPC methods for easy calling. Previous queries can be retrieved from the `history` property.

All RPC methods return a Promise.

```js
import QurasLib from 'quras-js'
// Creates a RPCClient with URL of version 2.3.2
const client = QurasLib.create.rpcClient('http://{IP}:{PORT}', '{Version}')
// Returns block number
client.getBlockCount()
client.getRawTransaction('f5412dba662ec8023e6fc93dba23e7b62679e0a7bebed52a0c3f70795cbb51d2', 1)

// This will throw an error as invokefunction is not supported @ 2.3.2
client.invokeFunction(contractAddr,'name')

// Custom query
let query = QurasLib.create.query({method: 'custommethod'}
client.execute(query)
```

### Query

A Query object is a simple wrapper around a request/response pair. It allows us to generate queries quickly without being dependent on a client.

Custom queries can be created by passing in the necessary parameters.

There are also static methods to support generating supported RPC methods.

```js
import QurasLib from 'quras-js'

// Custom query
const query = QurasLib.create.query({method: 'newmethod', params: [arg1, arg2]})
const response = query.execute('http://mycustomqrsnode.com:10039')

import { rpc } from 'quras-js'
// Simple query creation and execution
const response = rpc.Query.getBlock(1).execute('http://mycustomqrsnode.com:10039')
```

### Network

The Network class is a configuration object that contains the information required to connect to a blockchain.

```js
import QurasLib, { rpc } from 'quras-js'

const newNet = new rpc.Network({name: 'NewNet'})
QurasLib.add.network(newNet)

console.log(QurasLib.settings.networks['NewNet'])
```
