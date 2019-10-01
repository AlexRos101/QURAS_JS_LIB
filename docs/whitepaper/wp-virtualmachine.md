---
id: wp-virtualmachine
title: The structure of the QURAS VM
---

<p>The QURAS Blockchain has a Virtual Machine in the engine in order to perform the Smart Contract.</p>
<p>We will now look at the Virtual Machine Structure of the QURAS Blockchains.</p>
<p>Before you look at the Virtual Machine, please refer to Smart Contract.</p>
<p>Smart Contract consists of the byte column of the Opcode.</p>
<p>The user will also create the Smart Contract using C# and obtain bytecode which is a column of the opcode using the Smart Contract Compiler.</p>
<p>Let's start by looking at the Smart Contract Compiler.</p>

## Smart Contract Compiler

<p>The Smart Contract Compiler performs the role of converting a user-generated Smart Contract Code (C# code of the user level) into a script code, which is a column of opcode that can be executed on the VM in the QURAS Blockchain.</p>
<p>Users use the framework to provide the Smart Contract in a QURAS Blockchains and the role of converting the code into a script which can be recognized by VM can be performed by this Smart Contract Compiler.</p>

## Opcode

<p>The QURAS Smart Contract Virtual Machine provides the following Opcode Set.</p>
<p>The opcode content provided by the VM is as follows:</p>

  -	A collection of string related opcode.
  provides a string related processing, etc.
  -	Stack operations and collection of related opcodes.
  provides instructions such as stack operations in C and C + +.
  -	A collection of processes associated with a process operation
  provides the same instruction as if and for.
  -	A collection of constant number related opcodes
  provides an instruction such as Const.
  -	A collection of arithmetic operation related opcodes.
  provides instructions related to arithmetic operations, such as +, -, *, and /.
  -	A collection of encryption related opcodes.
  provides ECDSA, SHA and a variety of other algorithms to enable users to use encryption.
  -	A collection of data structure related opcodes.
  provides this Opcode instruction so that it can define the structure of the array and the structure of the complex form of materials.

## Opcode Fee

<p>There are 2 types of fee in the commission.</p>
<p>Let us look at these 2 types.</p>

### Deployment Fee

<p>In the QURAS Blockchains, users can use a variety of services for development by using the storage spaces provided by the Smart Contract.</p>
<p>The storage space used here is not free of charge.</p>
<p>In a QURAS Blockchain, users create the Smart Contracts and deploy them into a blockchain to make the content available to the users.</p>
<p>When users deploy the Smart Contracts, users must pay fees for the storage space and the System Call, etc.</p>
<p>The Deployment Fee is the commission that will be used when deploying the Smart Contracts.</p>

### Implementation Fee

<p>The QURAS is designed to provide a secure execution environment for the Smart Contract and to have equal results for the Smart Contract by all nodes. In order to execute the Smart Contract to all nodes, the fee must be paid.</p>
<p>The commission is also determined by the Smart Contract calculation logic, that is the opcode, whose unit is the Quras Token unit.</p>
<p>If the fee is not enough, the Smart Contract will fail.</p>
<p>All users are free of charge for the Smart Contracts that corresponds to the Quras Token 10.</p>

## VM Features

<p>The Smart Contract execution results must match on all nodes in the QURAS Blockchain.</p>
<p>If the result of the Smart Contract is changed by the node, the result of verification and agreement with the transaction will not be able to proceed.</p>
<p>Here, there is a difference in the execution results depending on the format of C, C + +, and the structured CPU.</p>
<p>There is also a possibility of the calculation result changing as the size of data such as int changes depending on whether the system is 32 bits or 64 bits.</p>
<p>However, the same result for the Smart Contract execution of a QURAS Blockchain must be produced regardless of all nodes or any CPU or OS environment.</p>
<p>The Blockchains cannot maintain itself if the data of blocks that reside on a node is changed because they are managed by a blockchain ledger of identical state on all nodes.</p>
<p>As such, Smart Contract VM of the QURAS Blockchains must be designed to leave the same result in the same input for all environment.</p>
<p>In other words, the QURAS Blockchain must be characterized by consistency.</p>
<p>Next, we will look at the characteristics of consistency in the QURAS Blockchains.</p>
<p>We will begin by time consistency.</p>
<p>All nodes have items like TimeStamp in the block agreement.</p>
<p>If there is any difference in time from a node using time related function in a Smart Contract, then the results will change.</p>
<p>That is, time synchronization of a node participating in a QURAS Blockchain is required.</p>
<p>All nodes participating in the QURAS Blockchain now require a time synchronization of the system, so that they are designed to be concatenated into a QURAS Blockchain.</p>
<p>By doing this, the time synchronization problem in Smart Contract is solved.</p>
<p>The following is a problem associated with the generation of a lance.</p>
<p>The generation of a lance can produce different results for all nodes.</p>
<p>The method to solve this problem in distributed networks is to introduce the concept of seed for the generation of a lance.</p>
<p>In other words, the blockchain synchronization can be executed by using a lance generator which is designed to produce the same result only for the same seed.</p>
<p>In the QURAS Blockchain, the hash value of the block is used as the Seed to use a lance generator.</p>
<p>The problem that may be raised is to ensure consistency of the storage space data used in Smart Contracts.</p>
<p>Since the QURAS Blockchain uses a distributed ledger, the decision on the data is the same on all nodes.</p>
<p>The data stored in the Smart Contract storage space can also be viewed as a deterministic since it can only be assessed by the contracts.</p>
<p>The state of all nodes that are generated in a blockchain can now be managed identically.</p>

## Smart Contract Types

<p>The Smart Contract type provided by the QURAS Blockchain can be divided according to the execution method.</p>

### Verification Contract

<p>When you look at a QURAS Blockchain, you can use a contract address instead of an address scheme managed by the public key, like other bitcoins.</p>
<p>In the QURAS Blockchain, all addresses are generated by the Script Hash.</p>
<p>The Script Hash contains the logic of an opcode that can validate sign code.</p>
<p>The address of the QURAS Blockchain is now created by this Script Hash, and the bandwidth of the address can be viewed as one contract.</p>
<p>In other words, if you look at a typical coin transmission, you can see it in a contract, and if a transaction occurs, you will be able to proceed with sign verification by executing the Script Hash opcode.</p>
<p>This contract is called the Verification Contract, but the value returned by the sign value and Script Hash value as input have one value between true and false simply as the bool type.</p>
<p>That is, if such a contract is true by the result of the return value, it will enter into a blockchain, and if false, the failure is acknowledged, and the transaction is lost.</p>

### Application Contract

<p>This transaction is the most commonly used contract in the Smart Contract of the QURAS Blockchain.</p>
<p>This transaction is executed by a particular transaction, but it can proceed with access and updates to the state of the system while running and can also change and query the value of the Contract Storage.</p>
<p>If the Application Contract generates a transaction, the fee must be paid by the Contract Script, and the Application Contract will fail if the fee is not sufficient.</p>

### Function Contract

<p>When creating a Smart Contract, the function can be of a public type so that the user can call it in another contract.</p>
<p>In such a case, there is a function contract as a contract that can be used.</p>
<p>In other words, the Smart Contract users will use such a contract when calling the function of a Smart Contract that has already been deployed.</p>

