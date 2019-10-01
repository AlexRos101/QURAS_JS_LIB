---
id: basic_sendasset
title: Basic - Sending assets
---

여기서 `sendAsset`함수를 리용하여 어떻게 자산의 송수신을 진행하는가에 대한 방법을 련재(tutorial)로 보여주고 있습니다.

`quras-js`는 QRS코인의 송신, QRG코인의 재분배와 스마트 콘트랙트실행과 관련한 여러 기능들을 제공하고 있습니다.
이본 련재에서 우리는 자산의 송신을 어떻게 진행하는지에 대하여 설명하려고 합니다.

여기서 말하는 자산이라는 개념은 QURAS코인에서 기본 코인인 QRS혹은 QRG코인을 의미한다.
또한 앞으로 QURAS불록체인에서 제공하는 스마트콘트랙트로 개발된 QEP1토큰에 대한 송수신방식도 련재될 예정입니다.

## Output 창조

자산을 송신하기 위해서는 먼저 `Output`를 생성해야 한다. 여기서 `Output`의 개념은 특정주소로 보내려는 자산의 정보를 말한다. 다시 말하여 주소 A로 어느만큼의 자산을 보내려고 하는가를 나타내는 마당이 바로 `Output`이다.

```js
  import QurasLib, {api} from 'quras-js'

  // DdMKz4NPardpaUqNVG7tfj9PgDNoD9zr9c 주소로 1 QRS를 보내려고 할때 다음과 같이 만든다.
  const intentQRS = api.makeIntent({QRS:1}, 'DdMKz4NPardpaUqNVG7tfj9PgDNoD9zr9c')
  // DdMKz4NPardpaUqNVG7tfj9PgDNoD9zr9c 주소로 1 QRG를 보내려고 할때 다음과 같이 만든다.
  const intentQRG = api.makeIntent({QRG:1}, 'DdMKz4NPardpaUqNVG7tfj9PgDNoD9zr9c')
  console.log(intentQRS) 
```

Output를 더 추가하려고 할때는 `api.makeIntent`함수를 리용하여 Output를 창조하고 그것들을 배렬로 묶는 방식으로 하면 된다.

## configuratin 객체의 설정

`sendAsset` 는 트랜잭션의 구성에 필요한 모든 상세정보를 포함하는 configuration 객체를 입력받아 트랜잭션을 생성한다.

```js
const config = {
  net: 'TestNet', // 트랙잭션을 실행할 QURAS불록체인의 네트웍을 설정한다. 
  address: 'DdMKz4NPardpaUqNVG7tfj9PgDNoD9zr9c',  // 이 주소는 자산을 보내려는 주소를 의미한다.
  privateKey: '8acd21064619fb4a8f309ef5eb9f85d913b81bd3b0894962e2974ba3bf821ca6', // 자산을 보내는 주소의 privatekey를 나타낸다.
  intents: intentQRS // 우에서 창조한 Output객체를 의미한다.
}
```

여기서 privatekey와 address는 서로 매칭되여야 한다. 이 configuration객체는 qurasDB와 같은 3rd party API써버와 련동하여 해당 address의 잔고를 얻어와 트랜잭션을 생성하고 서명하는데 리용되게 된다.

## 송신

```js
QurasLib.sendAsset(config)
.then(config => {
  console.log(config.response)
})
.catch(config => {
  console.log(config)
})
```

`sendAsset`는 3rd party API써버로부터 balance를 불러와서 transaction을 구성하고 서명을 진행하여 QURAS불록체인에 전송하는 모든 단계를 자동적으로 단번에 진행해준다.
즉 `sendAsset`함수는 구체적인 트랜잭션생성과정을 모르고도 이 하나의 함수를 리용하여 트랜잭션의 생성을 진행할수 있다.

되돌림형식은 다음과 같다.

```js
{
  result: true,
  txid: '48b83901a827fa343bf0e4d2ea00f4e7bd352ca28285f21e4bad9509f6460348'
}
```

트랜잭션이 성공하면 되돌림값으로 txid를 받는다.

## Notes

- `sendAsset`함수는 `api`모둘에서 찾을수 있다.
- 이 함수는 multi-sig 주소에는 대응되여 있지 않다.
