---
id: api-settings
title: Settings
---

`settings`모듈을 리용하여 QURAS불록체인의 network를 새로 등록할수 있습니다.

```js
import QurasLib, {settings} from 'quras-js'

// Semantic access
const newNet = new QurasLib.rpc.Network({name:'NewNet'})
QurasLib.add.network(newNet)

```

## networks

`{[network:string]: Network}`

`quras-js`모듈에서 제공하는 표준 network는 `MainNet`와 `TestNet`가 있습니다.

또한 addNetwork와 removeNetwork함수를 리용하여 Network를 추가할수도 있고 삭제할수도 있습니다.

```js
const customMainNet = new Network('MainNet')
// MainNet를 새롭게 수정할수 있습니다.
settings.addNetwork(customMainNet, true)

settings.removeNetwork('TestNet')
```