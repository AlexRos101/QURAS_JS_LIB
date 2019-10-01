---
id: api-index
title: API
---

`quras-js` 모듈은 QURAS불록체인과 련동하여 여러 써비스를 개발하려는 개발자들의 편의를 도모하기 위하여 여러가지 특정기능을 제공하는 서고이다.

## default

`quras-js` 에서 제공하는 표준 import 모듈인 QurasLib는 QURAS불록체인에서 리용되는 여러가지 기능들을 함수로 제공하고 있다.

```js
import QurasLib from 'quras-js'
QurasLib.create.privateKey()
QurasLib.serialize.tx(transactionObj)
QurasLib.get.publicKeyFromPrivateKey(privateKey)
```

표준 QurasLib를 리용하여 우와 같이 QURAS불록체인 초급개발자들이 쉽게 불록체인 써비스 개발에 접근할수 있도록 도모하기 위하여 리용되게 된다.

## api

`api` 모듈은 여러가지 외부 API들에 대한 표준 interface들을 제공한다.

## wallet

`wallet` 모듈은 QURAS불록체인의 키생성과 관련한 모듈을 제공한다.

## tx

`tx`모듈은 트랜잭션의 창조와 서명, 표준화와 관련한 부분을 제공한다.

## sc

`sc` 모듈은 스마트 콘트랙트와 관련한 부분에 대한 부분을 제공하며 QURAS불록체인에서 제공하는 InvocationTransaction과 함께 리용된다.

## rpc

`rpc` 모듈은 QURAS노드와 련동하는 기능을 수행한다.

## u

`u` 모듈은 utility의 약어로서 문자렬 변환, 하쉬 함수 등 QURAS불록체인에서 리용되는 기타 함수들을 구현하고 있다.

## CONST

`CONST` 모듈은 QURAS불록체인과 `quras-js` 에서 리용되는 상수값들을 정의하고 있다.
