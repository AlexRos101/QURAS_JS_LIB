---
id: api-rpc
title: RPC
---

`RPC` 모듈은 다음과 같이 리용할수 있습니다.

```js
import QurasLib from 'quras-js'
const client = QurasLib.create.rpcClient(URL)

import { rpc } from 'quras-js'
const client = new rpc.rpcClient(URL)
```

## Classes

### RPCClient

RPC Client는 특정 QURAS 노드처럼 동작할수 있습니다. RPCClient를 사용하여 QURAS network에 쉽게 접속하여 불록체인에서 제공하는 RPC함수를 리용할수 있다. 다만 Transaction 실행은 할수 없다.

모든 RPC호출의 되돌림값은 Promise형식이다.

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

Query객체는 단순한 request/response방식이다.

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

Network클라스는 해당 QURAS불록체인의 Network정보를 관리하는 클라스이다.

```js
import QurasLib, { rpc } from 'quras-js'

const newNet = new rpc.Network({name: 'NewNet'})
QurasLib.add.network(newNet)

console.log(QurasLib.settings.networks['NewNet'])
```
