---
id: basic_history
title: Basic - Getting History
---

In this lesson, we will show you how to get transaction histroy of you account.

You can get your transaction history using qurasDB API on `quras-js` module.

This example shows you how to get history using `quars-js` module.

```js
  import * as Quras from 'quras-js'

  Quras.api.qurasDB.getTransactionHistory("MainNet", "Dqf3UKe1f5FBWduGxHp8RMqP29dL6DgGS1")
    .then((data) => {
        console.log(data); // The history of transaction will be shown.
    })
    .catch ((error) => {
        console.log(error);
    });
```

You can get history of your account using this getTransactionHistory.