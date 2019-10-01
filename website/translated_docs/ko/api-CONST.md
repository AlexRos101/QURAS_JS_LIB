---
id: api-CONST
title: Constants
---

`quras-js`에서 리용되는 상수들을 다음과 같이 리용할수 있다.

```js
import QurasLib from 'quras-js'
const assets = QurasLib.CONST.ASSETS
const defaultRPC = QurasLib.CONST.DEFAULT_RPC

import { CONST } from 'quras-js'
const rpcVersion = CONST.RPC_VERSION
```

`quras-js`에서 제공하는 상수들을 우와 같이 리용할수 있다.

그러면 실지 `quras-js`모듈에서 제공하는 상수들에 어떤것들이 있는가를 보기로 하자.

마당 | 설명
--- | ---
ASSETS | QURAS에서 제공하는 자산을 표현함으로서 QRS와 QRG를 서술하고 있다. 호출방식은 ASSETS.QRS, ASSETS.QRG형식으로 리용할수 있다.