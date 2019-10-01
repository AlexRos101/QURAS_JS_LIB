---
id: wp-jsonrpc
title: JSON RPC for QURAS node
---

<p>The nodes in the QURAS Blockchain support the QURAS Blockchain by providing the JSON-RPC services so that developers can proceed with various platform development.</p>
<p>Developers can connect to nodes provided by the QURAS Development Teams, use their full node, and develop a variety of services that are combined with the QURAS Blockchain.</p>

## Blockchain Related JSON-RPC

### Get Block Method

<p>This command is used to obtain information about the block that corresponds to the parameter.</p>

#### Parameter Description

Parameters can be specified as 2 formats.
1.	The Hash Value of a block can be made as a parameter. <br/>
Information about the blocks that correspond to the Hash Value of a block is obtained.
2.	The number of the block can be made as a parameter. <br/>
Information about the blocks that correspond to the number of the block is obtained.

#### Example


### Get Block Count Method

<p>This is a method that obtains the block length of the current Main Chain.</p>

#### Parameter

The parameter does not exist.

#### Example

### Get Block Hash Method

<p>This is a method that obtains a Hash Value for a block that corresponds to the value of index received from the parameter.</p>

#### Parameter

`Index` : Indicates the number of a block that attempts to obtain a Hash Value for a block.

#### Example


### Get Block SysFee Method

<p>This is a method that gets the fee of the block corresponding to the index received from the parameter.</p>

#### Parameter

`Index` : Indicates the number that corresponds to the block for which the fee is to be obtained.

#### Example

## Wallet Related JSON-RPC

### Get New Address Method

This is a method which generates a new wallet on the current node.<br/>
But before running this method, your node must have the Wallet DB open.

#### Parameter

The parameter does not exist.

#### Example

### Send Raw Transaction Method

This is a method used to transmit a transaction to the QURAS Blockchain.

#### Parameter

`Hex` : After the transaction signature has been made, enter as a string in the form of 16 decimal digits.

#### Example

### Get Balance Method

This is a method that obtains the balance of a wallet which is opened by the current node.

#### Parameter

`Asset _ id`: It refers to the QURAS Coin or the QURAS GAS as an asset format.<br/>
`For the QURAS Coin balances` :<br/>
`For the QURAS GAS balances` :

#### Example

### Dump Priv Key Method

This is a method where a private key for the specified address in a wallet, which is opened by the current node, is obtained.

#### Parameter

`Address` : The address where the Private Key is obtained.

#### Example

## Smart Contract Related JSON-RPC

### Get Contract State Method

This is a method that obtains information from the Contract Script Hash for the Contract.

#### Parameter

`Scripthash` : The Script Hash for the Contract.

#### Example

### Get Storage Method

This is a method that obtains a value that corresponds to the Storage Key stored in the Contract Script Hash.

#### Parameter

`Scripthash` : The Script Hash for the contract.<br/>
`Key` : A key value in the form of a 16 decimal number that can be found from the storage space of a contract.

#### Example

### Invoke Method

This is a method that calls smart contracts corresponding to Script Hash as a given parameter and obtains the results.
This method is not reflected in the blockchain as it proceeds to the test for values already in blockchains in VM state.

#### Parameter

`ScriptHash` : The Script Hash for the Smart Contract.<br/>
`Params` : A parameter column that is entered when a Smart Contract is called.

#### Example

## Other JSON-RPC

### Get Connection Count Method

This is a method that gets the number of nodes that the current node is bound to.

#### Parameter

The parameter does not exist.

#### Example

### Get Raw Mempool Method

This is a method that examines the mempool of a node and gets a list of unprocessed transactions.

#### Parameter

The parameter does not exist.

#### Example

### Get Raw Transaction Method

This is a function that obtains the transaction information associated with the TxHash value set for the parameter.

#### Parameter

`TxHash` : Indicates the transaction Hash Value.<br/>

`Type` : If 0, it can be obtained in the raw form of transaction.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If it is 1, it will be in full form of transaction.

#### Example

### Get TX Out Method

<p>This is a method that gets an item from the Transaction Output that is not sent from the Transaction to the Transaction Hash.</p>
<p>If all Tx Output items are sent, the result will get a null value.</p>

#### Parameter

`TxHash` : The Hash Value for the transaction.
`Index` : The value of an index in the Transaction Output column starting at 0.

#### Example

### Get Peers Method

This is a method that obtains information on the current nodes that were connected to or is disconnected.

#### Parameter

The parameter does not exist.

#### Example