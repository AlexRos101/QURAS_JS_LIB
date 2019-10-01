---
id: adv_multitx
title: Advanced - Sending multiple transactions in a block
---

In this tutorial, I shall go through how we can send multiple transactions within the same block.

If you have been using the current methods `sendAsset` and `doInvoke`, you would have realised that the second transaction coming out from the same address will fail if done quickly enough. This is due to the second transaction being unaware of the first transaction and thus it tries to spend the same inputs as the first transaction has used. Therefore, this is double spending and the node rejects our second transaction.

