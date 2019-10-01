---
id: basic_checkbalance
title: Basic - Check balance
---

We learned how to create account and using this in prev lesson.
This lesson will show you how to get balance of your account.

`quras-js` module will be run with qurasDB, the Third-party API.
On `quras-js`, there are several logics of qurasDB, so that users can use this easily.

## Check Balance

`quars-js` supports you the function that can be check the balance.
Then let's see how to check your balance with example.

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

You can check your balance like this above.