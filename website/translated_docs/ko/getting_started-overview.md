---
id: overview
title: Overview
---

``quras-js`` 는 Javascript 서고로서 QURAS불록체인의 Interface를 구현해준다.
개발자들은 ``quras-js`` 서고를 리용하여 transaction을 창조하거나 스마트콘트랙트를 구현할수 있다. 

## 구현된 기능들

- QURAS엔진에서 제공하는 RPC 통신부가 구현되였다.
- Wallet의 키생성부분이 구현되였다.
- Transaction의 생성부분이 구현되였다.

## 구현해야 할 기능들

- Smart Contract Script Build부분이 구현되였다.
- qurasDB 써버와의 결합작업이 구현되였다.

## 사용법

``quras-js`` 는 2가지 방식으로 리용될수 있다.

### 의미론방식

QurasLib를 Import함으로서 표준으로 리용되는 방식인데 보다 의미론적으로 사용자들이 리용할수 있도록 도모해준다.

```js
import QurasLib from 'quras-js'
QurasLib.create.privateKey()
QurasLib.serialize.tx(transactionObj)
QurasLib.get.publicKeyFromPrivateKey(privateKey)
```

이 방식은 'quras-js'초보자들이 리용하기 편리하게 구축되였다.

### 부분모듈 방식

다음의 모듈이름을 리용하여 다음과 같이 리용할수도 있다.
이 방식은 QurasLib의 의미론적보다는 보다 구체적인 모듈을 부분적으로 리용함으로서 보다 구체적인 작업을 진행할수 있도록 제공한다.

- `api`
- `CONST`
- `rpc`
- `sc`
- `tx`
- `u`
- `wallet`

```js
import { api } from 'quras-js'
```
