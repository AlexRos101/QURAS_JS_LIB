---
id: basic_sendcoin
title: Basic - Sending coins
---

In this lesson, we will show how to send QURAS coins using `quras-js` module.
`quars-js` module supplys you the function that send assets under the qurasDB API.

Let's see the example.

```js
import * as Quras from `quras-js`

Quras.api.qurasDB.getBalance(Quras.CONST.QURAS_NETWORK.MAIN, 'DknmAbcap8RnUpkLQvbXTwTXqFJMjN4QPz') // Get the balance of from address.
.then((data) => {
    const balance = new Quras.wallet.Balance(data)
    var scriptHash = Quras.wallet.getScriptHashFromAddress('Dqf3UKe1f5FBWduGxHp8RMqP29dL6DgGS1'); // To address.
    const outputs = [{
            assetId: Quras.CONST.ASSET_ID['QRS'], // The type of coins that you want to send.
            value: 2, // Coin amount to send.
            scriptHash: scriptHash // The scripthash of "To address".
        }]
    
        const testTx = Quras.tx.Transaction.createContractTx(balance, outputs) // create a transaction.
    
        testTx.sign('20164b85226c67cb6d8fe114f3b91af3f2dfc52dcf05d708e9eca80c8d739481'); // Sign the transaction using private key
    
        rpcServer.sendRawTransaction(testTx.serialize()) // Send the transaction to RPC Server.
        .then((data) => {
            console.log(data);
        })
        .catch ((error) => {
            console.log("error");
        });
})
.catch((error) => {
    console.log(error)
});
```

You can send your coin to other address like this, above.
This way will be used in professional case.
You can use sendAsset to send the coin.
This way is simple than this.