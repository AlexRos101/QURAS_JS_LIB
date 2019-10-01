---
id: api-u
title: Utility
---

utility모듈을 리용하는 방법은 다음과 같습니다.

```js
import QurasLib from 'quras-js'
QurasLib.u.reverseHex(hexstring)

import { u } from 'quras-js'
u.reverseHex(hexstring)
```

utility모듈은 다음의 3가지 형식의 함수들을 제공합니다.

- 문자렬의 형식변환과 관련한 메쏘드들
- 하쉬함수들과 관련한 메쏘드들
- Utility 클라스들

## Utiltity 클라스들

### Fixed8 클라스

Fixed8클라스는 QURAS불록체인에서 자산의 량을 관리하는 기본 자료형으로서 bignumber에 대한 계산처리를 진행하기 위하여 개발된 클라스입니다.

```js
import QurasLib from 'quras-js'
const a = new QurasLib.u.Fixed8(1)
a.toHex()        // '0000000005f5e100'
a.toReverseHex() // '00e1f50500000000'

const b = QurasLib.u.Fixed8.fromHex('0000000005f5e100') // 1

import {u} from 'quras-js'
const c = new u.Fixed8('2')
const d = u.Fixed8.fromReverseHex('00e1f50500000000')
```

## 함수들

### 형식변환관련 함수들

QurasLib에서 많이 리용되는 문자렬 변환 함수들이 여기에 서술되여 있다.

```js
import QurasLib from 'quras-js'
QurasLib.u.reverseHex(hexstring)
QurasLib.u.num2fixed8(1)
QurasLib.u.ab2str(arrayBuffer)

// 16진수 문자렬로 변환
QurasLib.u.str2hexstring('QurasString') // 5175726173537472696e67
QurasLib.u.int2hex(234) // EA
QurasLib.u.ab2hexstring(arrayBuffer)

// 16진수 문자렬을 일반 문자렬로 변경
QurasLib.u.hexstring2str('5175726173537472696e67') // QurasString
QurasLib.u.hex2int('EA') // 234
QurasLib.u.hexstring2ab(hexString)
```

### 하쉬관련 함수들

utility모듈에서는 sha256, hash256, hash160과 같은 QURAS불록체인에서 리용되는 기본 하쉬함수들을 제공하고 있습니다.

쓰는 방식은 다음과 같습니다.
```js
import QurasLib from 'quras-js'
// Performs a single SHA
QurasLib.u.sha256(item)
// Performs a SHA followed by a SHA
QurasLib.u.hash256(item)
// Performs a SHA followed by a RIPEMD160
QurasLib.u.hash160(item)
```

