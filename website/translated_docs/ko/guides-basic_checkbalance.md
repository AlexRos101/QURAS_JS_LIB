---
id: basic_checkbalance
title: Basic - Check balance
---

우의 련재에서 우리는 어떻게 계정을 창조하고 관리하는지에 대해서 보았습니다.
이번 련재에서 어떻게 창조된 계정에 대한 잔고관리를 진행할것인가에 대해서 보기로 합시다.

`quras-js`모듈은 qurasDB라는 Third-party API를 결합하여 진행하게 된다.
`quras-js`에 qurasDB로직이 구현되여 있기 때문에 사용자들은 편리하게 리용하면 된다.

## 잔고확인

`quras-js`에서 qurasDB를 통하여 잔고를 확인할수 있는 함수를 제공하고 있다.
그러면 어떻게 지갑잔고를 확인할수 있는지 실례를 통하여 보기로 합시다.

```js
  import * as Quras from 'quras-js'

  Quras.api.qurasDB.getBalance(Quras.CONST.QURAS_NETWORK.MAIN, 'DknmAbcap8RnUpkLQvbXTwTXqFJMjN4QPz')
  .then((data) => {
      console.log(data);
  })
  .catch((error) => {
      console.log(error);
  });
```

우의 실례와 같이 지갑잔고를 확인할수 있다.