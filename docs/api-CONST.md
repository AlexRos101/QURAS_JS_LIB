---
id: api-CONST
title: Constants
---

Constants are defined and exposed as:

```js
import QurasLib from 'quras-js'
const assets = QurasLib.CONST.ASSETS
const defaultRPC = QurasLib.CONST.DEFAULT_RPC

import { CONST } from 'quras-js'
const rpcVersion = CONST.RPC_VERSION
```

Do refer to the source code for all the constants available.

그러면 실지 `quras-js`모듈에서 제공하는 상수들에 어떤것들이 있는가를 보기로 하자.

마당 | 설명
--- | ---
ASSETS | QURAS에서 제공하는 자산을 표현함으로서 QRS와 QRG를 서술하고 있다.<br/> 호출방식은 ASSETS.QRS, ASSETS.QRG형식으로 리용할수 있다.
DEFAULT_RPC | 이 마당은 qurasDB의 URL을 나타낸다.<br/>MAIN과 TEST가 있는데 불록체인의 형식을 규정한다.<br/>리용방식은 DEFAULT_RPC.MAIN 혹은 DEFAULT_RPC.TEST 형식으로 리용한다.
QURAS_NETWORK | 이 마당은 QURAS불록체인의 MAIN 네트인가 아니면 TEST 네트인가를 판별해주는 상수이다.<br/> QURAS_NETWORK.MAIN 혹은 QURAS_NETWORK.TEST 형식으로 리용한다.
RPC_VERSION | qurasDB API 써버와 RPC통신을 진행할때 리용되는 RPC version을 의미한다. 현재 2.3.2로 설정되여 있다.
TX_VERSION | 트랜잭션의 version마당값을 나타내는 상수이다. CONTRACT는 송수신 트랜잭션의 버젼을 나타낸다. INVOCATION은 SMART CONTRACT 트랜잭션의 버젼을 의미한다.