---
id: wp-blockchainstructure
title: Structure of QURAS Blockchain
---

Refer to the following figure for an intuitive representation of QURAS Blockchain.<br/>
<center>![/quras-js/img](http://13.230.62.42/quras/img/whitepaper/StructureOfBlockchain.png)</center>
<center>Figure 1. Intuitive Structure of QURAS Blockchains.</center><br/>
<p>In the above diagram, there is a large Full Node, a Light Node, and a Consensus Node in the blockchain.</p>
<p>The Consensus Node must exist in order for the blockchain to be maintained.</p>
<p>The Consensus Node is a node that generates blocks in a blockchain.</p>
<p>The Consensus Node performs a Transaction validation and Smart Contract execution.</p>
<p>The Consensus algorithm has been described in detail later and will not be mentioned here.</p>
<p>The Full Node role will be used for validation of transaction and broadcasting that have occurred and will now act as a Wallet and Website Engine.</p>
<p>The Full Node is currently implemented by the ZK-SNARKS algorithm.</p>
<p>That is, it will provide all types of Transaction.</p>
<p>Light Node can be viewed as a lightweight engine that will be used in Light Wallet for PCs.</p>
<p>Light Node does not download all blocks of the blockchains, so it does not require a lot of storage space.</p>
<p>Light Node is designed to be used only in Light Wallets, so it doesn't have any unnecessary features, and it only implements features that are required for wallets.</p>

## Structure of P2P Communication

<p>A blockchain is a system in which all nodes are connected in a P2P system without a specific server.</p>
<p>In other words, all nodes of the QURAS Blockchain proceed its communication with the P2P method.</p>
<p>In this section, we will specifically describe how all the communication structures between the Full Node, Light Node, and Consensus Node of the QURAS Blockchain will be reflected.</p>
<p>All communications between nodes will now be described here.</p>
<p>All communications carried out in a QURAS Blockchain are to be proceeded by the communication structure of the Quras Command which encapsulates all the communication parts.</p>
<p>Now, we will look at the structure of the Quras Command and explain the individual communication parts.</p>

### Structure of QURAS Command

<p>The structure of the Quras Command is as follows:</p>

Items | Description
--- | --- 
Network Type (Magic) | The item in Magic indicates the type of Network, and it becomes an item to distinguish Mainnet and Testnet from QURAS Blockchain.
Command | The value of this item divides the basic mission as command. The description for the command will proceed as follows.
Checksum | This item is used to distinguish whether or not the item of the Payload is correct as the Checksum.
Body (Payload) | This item can be viewed by the command as the basic parameter of the command. The structure of this item is described below along with the command parameter.
<center>Table 1. Quras Command Items</center> <br/>

<p>The communication of all the packets in the QURAS Blockchain is carried out in accordance with the above Quras Command structure.</p>
<p>All nodes in a QURAS Blockchain will proceed with the following authentication if they receive a Quras Command:</p>

  - Comparing the Local Network Type and Quras Command Network Type, we will perform the next step if these are the same. Otherwise, we will disconnect the concatenation.
  - Calculate the Checksum of Payload and compare it to Checksum in the Quras Command, and then perform the next step. Otherwise, we will disconnect the concatenation.
  -	Check the length of the parameter and disconnect the concatenation if the length is greater than 0 x 2000000. Otherwise, we will interpret the item in Payload.

<p>The QURAS Blockchain carries out tests on the above 3 types and verifies the accuracy of the Quras Command.</p>
<p>Now, let's talk about what kind of command is in a QURAS Blockchain communication command, and what kind of structure the corresponding Parameter has.</p>

#### SYN Command

<p>This is a command that exchanges information on a node to establish a concatenation between nodes.</p>
<p>The parameter of the SYN command is as follows:</p>

Items | Description
--- | --- 
Protocol Version | It is the node engine communication parts as the Protocol Version of the current node.
Module Services (Services) | This item is an item that displays the state of the current QURAS Blockchain on the node network.
Timestamp | Represents the time when a command was generated.
Port | It represents a Port to send and receive command in the current node.
Nonce | This item means the number assigned randomly to identify the node that sent the command.
User Agent | It refers to a build version of a node.
Block Start Height (StartHeight) | This means the size of the Local block of a node.
Relay | It is an item that determines whether a packet is to be transmitted. It is set to a True value in general.
<center>Table 2. Version Command Item</center> <br/>

<p>All nodes will be able to know the state of the remote node through SYN Command and to determine which nodes it will be able to be provided to receive the necessary document, such as the block, from.</p>

#### ACK Command

<p>This command does not have any parameters.</p>
<p>This is a command sent to the answer when the node receives an SYN command.</p>
<p>In other words, it is a reply command to SYN that is sent in the sense of confirming the verification for SYN command and establishing a connection with the remote node.</p>

#### GetBlocks Command

<p>This is a command that the node sends to download the block.</p>
<p>The parameters of this command are as follows:</p>

Items | Description
--- | --- 
Start | It refers to the block which is to be downloaded first.
End | It refers to the block which is to be downloaded last.
<center>Table 3. GetBlock Command Items</center> <br/>

<p>This command is sent to the Remote node as a command that is used to synchronize its own log blockchain from the Remote node.</p>

#### Addr Command
<p>This is a command used when sending the information on the remote node connected to itself to the requested node.</p>

Items | Description
--- | --- 
Address List | It will be sending information about the nodes that are connected to it in a List format.
<center>Table 4. Addr Command Items</center> <br/>

<p>In this case, the meaning of the Address List item is as follows:</p>

Items | Description
--- | --- 
Module Services | This item is an item that displays a state of a node in a QURAS Blockchain that is attached to a network.
Timestamp | This item means the time associated with the local node.
Protocol Version | It means the node engine version of the node engine as the protocol version of the current node.
End Point | It is the current node's Network information. Specifically, the IP address and port number.
<center>Table 5. Address List Items in the Address List</center> <br/>

<p>In other words, all nodes will receive an Addr Command and establish connections based on the information of the other nodes and connect to P2P of the QURAS Blockchain.</p>

#### GetHeaders Command

<p>This is a command that the node sends to the Remote node to download the header of the block.</p>
<p>The parameter of this command is the same as the GetBlocks command.</p>

Items | Description
--- | --- 
Start | This means the block to be downloaded first.
End | This means the block to be downloaded last.
<center>Table 6. GetHeaders Command Items</center> <br/>

<p>This command will be implemented in FullNode and LightNode.</p>
<p>Specifically, LightNode downloads only the header of a block.</p>

#### Mempool Command

<p>Mempool means the storage space for a node's Transaction.</p>
<p>This is a command to be called to synchronize the appropriate Remote Node and Transaction.</p>
<p>This command does not have any parameters.</p>
<p>In other words, the aim of this command is to send a command to call to synchronize the currently generated Transaction.</p>

#### GetAddr Command

<p>This command will be used in the following cases:</p>
<p>All nodes store the information of the connected node in a PeerList.</p>
<p>This is because a node is connected to a chain of P2P blocks again when a node is rebooted or reconnected to the Internet.</p>
<p>Since the QURAS Blockchain is a P2P method instead of a Server / Client method, all nodes are connected to the server by any number of nodes, thereby forming a single large P2P network in connection with any number of nodes.</p>

  1) In the case where this command is available is when the node is started for the first time, and the node’s PeerList is empty. In this case, the node connects to a node called a SeedNote of blockchains and sends this command. In other words, this command is used to obtain the connectable node information, and it is connected to the P2P network of the QURAS Blockchain.

  2)	In the second case, the node has a PeerList, but the number of nodes in the PeerList or the number of nodes that are currently concatenated is smaller than the number of nodes that are bound to the standard. In other words, a node needs to be concatenated with about 6 nodes, but the number of nodes currently connected to the node is assumed to be 2. In such a case, the node can send a GetAddr command to the 2 nodes to which the node is connected to secure the concatenation information. When all nodes on the P2P network receive a GetAddr command, they query the information on the node that is connected to it, collect the latest information, and send it back.

<p>In the same manner, all nodes in the QURAS Blockchain will be connected to a P2P network to form a blockchain.</p>
<p>GetAddr command does not have any parameters.</p>
<p>The GetAddr response will result in an Addr Command.</p>

#### INV Command

<p>This is a command that sends a hash value for the Transaction, Block, and Consensus.</p>
<p>The items for the parameters are as follows:</p>

Items | Description
--- | --- 
Type | This is an item that specifies the format of an INV command.<br/>0: Transaction<br/>1: Block<br/>2: Consensus
HashList | This means the List of Hash corresponding to the Item of Type.
<center>Table 7. Inv Command Items</center> <br/>

<p>The description of the above items is as follows.</p>

  1)	In the case of Type: 0, the Hash List of the Transaction is sent in the form of a Hash list in response to the response of the Mempool Command.
  2)	When Type: 1, when a Get Blocks Command is received, the block Hash value from the Start of the block to the end of the block is generated by the hash list.
  3)	Type: 2 will be used in the communications between the Consensus Nodes

<p>This command will also work in response to GetData Command.</p>

#### Tx Command

<p>This is a command that sends the information of a Transaction as a response to a GetData command.</p>
<p>This command will also be used to send the Transaction information for Hash, which is requested in response to the Inv Command.</p>
<p>The Tx Command is the same as the Structure of the Transaction as the parameter.</p>
<p>The structure of the Transaction will be specifically mentioned later.</p>

#### Block Command

<p>This is also a command transmitted by the request of GetData or Inv Command like the Tx Command.</p>
<p>In the same manner as the Tx Command, the block value corresponding to the Hash of GetData or Inv Command is transmitted in the parameter.</p>
<p>The structure of the block will also be mentioned later.</p>

#### Merkle Block Command

<p>This command will form the parameter in the block header value of the block, the number of transactions that the block has, and the Merkle Tree Hash value that is created by the Transaction.</p>

Items | Description
--- | --- 
Block Header | This part will be described later. (Link)
Tx Count | It refers to the number of transactions contained in a block.
Hash List | It forms the Merkle tree and is an array value for the Merkle Tree.
<center>Table 8. MerkleBlock Command Items</center> <br/>

#### Consensus Command

<p>This command includes agreement and related content as a command exchanged between agreed nodes.</p>
<p>For this command, refer to the link.</p>

#### Headers Command

<p>This command requests the header value of the block, that is, this command extracts and transmits the header information as a response to the request by the Get Headers Command.</p>
<p>The parameter of this command is the same as the block header and so refer to the link.</p>

<p>All nodes of the QURAS Blockchain will communicate the requested data through the above command structure.</p>

## Wallet Structure

<p>Provides coin encryption and transparent transmission and reception for 2 types of QURAS Blockchains.</p>

### Transparent Wallet Structure

<p>Transparent Wallet will use ECC encryption to generate Private Key and Public Key and generate Address by Public Key.</p>
<p>The basic key problem here is how Private Key and Public Key generation generate the address used by users, and how to proceed with the verification of Transaction using Private Key and Address.</p>
<p>ECC encryption (elliptic curve cryptography) is a public-key cryptography based on elliptic curve theory. Elliptic curve encryption has the advantage of requiring shorter keys (for example, RSA) than the other public key cryptography. [1]</p>
<p>The elliptic curve cryptosystem theoretically can calculate theoretically finite time by the theory of computational complexity, but it takes advantage of the fact that it takes too long to actually calculate it.</p>
<p>The same encryption as RSA of initial public key encryption was developed by a theoretical basis that took a long time to split 2 or more prime numbers.</p>
<p>ECC encryption was created in that it takes a long time to look for discrete logarithms of random elliptic curves for a known point in time.</p>
<p>For encryption purposes, an elliptic curve means a set of points satisfying the following equation as a kind of planar curve.</p>

<center>x^3+ax+ b=y^2</center>
<p>This is a standard elliptic curve equation used in general ECC encryption.</p>
<p>The elliptic curve used herein QURAS Wallet is secp256r1, which is proposed as a standard.</p>
<p>The ECC encryption is not specifically described here because there is a number of references.</p>
<p>The Private Key length of QURAS Wallet is 32 bytes.</p>
<p>This Private Key is generated randomly by an algorithm which cannot be reissued by time and device information.</p>
<p>The method of generating the Public Key by Private Key is as follows:</p>
<p>G point as the standard for secp256r1 of ECC is as follows:</p>
 0x036b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296
<p>The Public Key is a value derived discretely from the above-mentioned G point and Private Key.</p>
<p>The length of the Public Key obtained at this time is 66 bytes.</p>
<p>At this time, the first 33 bytes of Public Key means the X-axis value, and the next 33 bytes mean the Y-axis value.</p>

X Value (33byte)|Y Value (33byte)
--- | ---
66 Byte

<p>In this case, Script Hash is generated as follows depending on whether the Y value is even or odd:</p>
<p>If the Y value is an even number, the first byte of X is set to 02.</p>
<p>If the Y value is odd, the first byte of X is set to 03.</p>

<p>After generating Script Hash, the Script Hash length is 0 x 21 bytes.</p>
<p>Add 1 byte of Address Version to the last byte of this Script Hash, and then take Hash 160.</p>
<p>If the Hash 160-byte column is set to encoding Base 58, Address is displayed.</p>
<p>The above description can be represented in the following table:</p>

<center>![/quras-js/img](http://13.230.62.42/quras/img/whitepaper/GeneratingTransparentAddress.png)</center>
<center>Figure 2. Generating a Transparent Address</center>

<p>When speaking of wallets in a QURAS Blockchain, it means a basic Private Key, and it is recommended that this Private key is being stored well.</p>
<p>Users can also get a variety of services by simply keeping the Private Key or using the Wallet, and users can check the balance of the coins stored in the Address.</p>
<p>We will continue to evolve the encryption algorithm for Address and will further improve research so that users can make more secure money.</p>

### Anonymous Wallet Structure

<p>There are 2 major types of the Anonymous Address.</p>
<p>There is a bandwidth of the Address using the ZK - Snarks and the Address using the Ring - Signature.</p>
<p>First, we will look at the Address band using the ZK - Snarks.</p>

#### ZK-SNARKS Address Structure

<p>The key for the Anonymous Wallet is different from the Transparent Key’s format.</p>
<p>The Private Key length of Anonymous Wallet is 31 bytes.</p>
<p>The Private Key of Anonymous Wallet is also a random byte column of 31 bytes which is created by a random generator.</p>
<p>In the Anonymous Wallet, the Private Key is called the Spend Key.</p>
<p>You can generate Receiving Key, Viewing Key, and Address based on this Spend Key.</p>
<p>The Receiving Key can be viewed as the Public Key of the Spend Key.</p>
<p>The Receiving Key is obtained by using the crypto _ scalamult _ base function of the library of Sodium as a key to be obtained by advancing the scalar multiplication from the Spend Key.</p>
<p>Of course, this algorithm is also performed by using the ECC algorithm.</p>
<p>Viewing Key will be created by using the PRF function from the Spend Key.</p>
<p>The PRF function is a function defined by itself and can be confirmed by referring to the source in order to see it concretely.</p>
<p>The Address is composed of a combination of Public Key and Public EncKey of ECC.</p>

<p>The configuration diagram of Anonymous Address is as follows.</p>

#### Ring Signature Address Structure

## Structure Of The Transaction

<p>The QURAS Blockchain has a variety of transactions.</p>
<p>This will specifically describe the various transaction offered by the QURAS Blockchains.</p>
<p>Before describing the structure of a transaction, let's talk about the items and structures that all transactions include in common terms.</p>

### Transaction Structure (Common Part)

<p>The transaction structure mentioned here is a structure that is included in all types of transaction.</p>
<p>In the future, when describing another structure of the transaction, we are trying to display this part as a transaction Field.</p>

Items | Description
--- | --- 
Transaction Type | As a type of transaction, it is modified by the structure and the mission of the transaction.
Version | This shows the version of the transaction, where if the item in the transaction is updated, it is designed to be processed by the value of this item.
Transaction Attribute | It applies to Smart Contract and specified transaction as an item associated with the additional function of the transaction.
Coin Reference | Coin Reference refers to Tx's Out Put reference for coins that are not currently being sent to Bitcoin in the same manner as UTXO information being sent.
Transaction Outputs | It is the Tx Output for the receiving side of the coin send / receive.
Script | Transaction validation and Smart Contract content would be placed here.
<center>Table 9. Structure of the Transaction</center> <br/>

<p>Let's take a look at the type of transaction.</p>
<p>The type of transaction includes the type of all transactions used in the QURAS Blockchain.</p>
<p>The type of transaction defined for the type item is as follows:</p>

  -	Miner Transaction
  -	Issue Transaction
  -	Claim Transaction
  -	Enrollment Transaction
  -	Register Transaction
  -	Contract Transaction
  -	Anonymous Transaction
  -	Publish Transaction
  -	Invocation Transaction

<p>The above transaction will be described later in detail.</p>

### Structure Of Miner Transaction

<p>The Miner Transaction is a transaction that generates a Consensus Node, a node that generates a block.</p>
<p>This can be viewed as a transaction that is currently being sent to the current block creator account by integrating the commission fees of the transaction.</p>
<p>In other words, the Miner Transaction is registered in the first transaction of the block as a transaction to transfer a commission to the block creator’s account by calculating the commission for the transaction in the block after the creation of a block.</p>
<p>In addition to the item in the transaction, the Miner Transaction will further include items that represent the Nonce item, such as random value.</p>

### Structure Of Issue Transaction

<p>The Issue Transaction does not have any special items.</p>
<p>The Asset creator can create an asset that will be registered in the QURAS Blockchain through Issue Transaction and will be transferred to all addresses.</p>
<p>When it comes to a QURAS Blockchain, the transaction fee is 0.</p>

### Structure Of Enrollment Transaction

<p>The items added to this transaction are as follows:</p>

Items | Description
--- | --- 
PublicKey | It is the Public Key for the verifier.
<center>Table 10. Additional Enrollment Transaction Items</center> <br/>

<p>This is the transaction that will be issued to become a verifier.</p>
<p>In order to become a verifier, you must configure the Enrollment Transaction and send a deposit to the PublicKey address.</p>
<p>You can cancel the registration by withdrawing the deposit in PublicKey.</p>

### Register Transaction Structure

<p>This is a transaction that is used when registering assets such as QURAS coin and QURAS Gas Token in a QURAS Blockchain.</p>
<p>In other words, you can think of it as a transaction that registers a user-defined asset, such as an Ethereum ERC 20 token.</p>
<p>This transaction will add asset information to the transaction structure as an asset registration transaction.</p>
<p>The items of information to be added are as follows:</p>

Items | Description
--- | --- 
Asset Type | This is an item indicating the type of the asset.
Name | It is an item indicating the name of the asset.
Amount | It is an item indicating the number of assets to be issued when the asset is registered.
Precision | It is an item used to represent decimal places in the number of assets.
Owner | It is the information of the user who owns the asset.
Admin | It is an item indicating Script Hash.
<center>Table 11. Asset Registration Items</center> <br/>

<p>The information on the assets registered by the above items is registered in a blockchain to make users use the information.</p>
<p>In other words, the QURAS Blockchains provide asset registration transactions that allow users to build and use their own assets in a QURAS Blockchain.</p>

### Structure of Contract Transaction

<p>This is the transaction associated with the sending and receiving of the asset.</p>
<p>Users will be using this transaction to send and receive assets.</p>
<p>This transaction uses the transaction common part as it is.</p>
<p>So, let's take a look at how users can use this transaction to send their coins.</p>
<p>A blockchain is a collection of blocks as a distributed ledger.</p>
<p>All blocks include transaction, etc.</p>
<p>In other words, the Contract Transaction will also be all included in the block.</p>
<p>All the user's coin transmission history will be included in the blockchain of the distributed ledger more accurately.</p>
<p>All users in a blockchain are divided into Address created by ECC, and all users have Private Key that corresponds to Address.</p>
<p>The structure of the Transparent Address is mentioned above.</p>
<p>The user has a Private Key, a Public key, a Script Hash, and an Address.</p>
<p>The blockchain stores Script Hash and Address as data.</p>
<p>The Private Key is a key that is stored separately by the user.</p>
<p>Now let's go through an example of how to generate a real transaction.</p>
<p>Suppose User A is sending 100 coins to User B.</p>
<p>Assume that A has 200 balances.</p>
<p>A has 200 balances means that there is a Transaction Output that is still not sent.</p>
<p>There is a Coin reference item in the Contract Transaction.</p>
<p>The meaning of this item is as follows:</p>

Items | Description
--- | --- 
PrevHash | Indicates the Hash value of the previously generated transaction.
PrevIndex | This item means the Index value of the Transaction Output List that is included in the transaction.
<center>Table 12. Coin Reference Items</center> <br/>

<p>All transactions have a Transaction Output Item.</p>
<p>The Coin Reference will specify this Transaction Output as the Index value for the Transaction Hash and the Transaction Output List.</p>
<p>In other words, the Coin Reference items are specified as described above when sending coins from A to B.</p>
<p>Then when you send 100 coins to B, you have to add a Transaction Output.</p>
<p>However, since the Coin Reference has a balance of 200, it generates 2 Transaction Output to send a 100 to A and a 100 to B.</p>
<p>So, let's look at the meaning of the item on the Transaction Output.</p>

Items | Description
--- | --- 
AssetID | It is an item indicating which assets are to be transferred as an ID of the asset.
Value | It is an item indicating the amount to be remitted.
Script Hash | It is the Script Hash of the user who receives the coin.
<center>Table 13. Transaction Output Items</center> <br/>

<p>If you transfer the Coin Reference and the Transaction Output Item to match the format described above, coins will be transferred.</p>
<p>The content of described above can be represented in the following table:</p>

<center>![/quras-js/img](http://13.230.62.42/quras/img/whitepaper/TransparentTxPrinciple.png)</center>
<center>Figure 3. Transparent Tx Principle</center>

<p>The principle of remittance of all coins proceeds as described above.</p>

### Structure of Anonymous Transaction

<p>The Anonymous Transaction is divided into 2 types by the encryption algorithm.</p>

#### ZK-SNARKS Anonymous Transaction

<p>The ZK- SNARKS is the first encryption module introduced by Zcash coin.</p>
<p>The QURAS Blockchain uses ZK- SNARKS to encrypt transactions with the aim of Anonymous Transaction.</p>
<p>It is important to implement the basic transaction validation of the encryption blockchain.</p>
<p>In the anonymized transaction using ZK- SNARKS, all the transaction contents are encrypted, so the verification method for this is different from the Transparent Transaction.</p>
<p>First of all, the Private Key and the Address method are different from the Transparent Address method in ZK- SNARKS algorithm.</p>
<p>The encryption algorithm is based on ECC, but the Address method is different.</p>
<p>This part will be referred to above because it has been mentioned above.</p>
<p>The term "encrypted transaction" means that the sender, the recipient, and the transaction amount of the transaction are encrypted as a result of the transaction, when 100 coins are transmitted in the form of A -> B as an example.</p>
<p>That is, because the contents of the transaction are encrypted, only a user who has a private key in the ZK-K SNARKS can interpret the encrypted portion of the transaction contents.</p>
<p>At this time, the verification method of the transaction will be required at the Consensus Node.</p>
<p>That is, using the features of the ZK- SNARKS algorithm, the Consensus Node can determine that the encrypted transaction is accurate even if you do not know the <p>Private Key of the User at all.</p>
<p>The Anonymous Transaction has a byte column for the encrypted transaction and a sign for the encrypted byte column and an entry for the signed Public Key.</p>
<p>The added items are as follows:</p>

Items | Description
--- | --- 
AnonymousTx | It means the encrypted byte column of the transaction.
PubKey | This means Public Key to validate this encrypted item.
Sign | This item is an item for verification of Anonymous Tx as a sign for Hash of Anonymous Tx byte column.
<center>Table 14. Additional Items for Anonymous Transaction</center> <br/>

<p>For the basic ZK- SNARKS algorithm, refer to the following.</p>

### Structure Of Publish Transaction

<p>At the next step, the Publish Transaction is still trying to add a transaction that will be used when publishing a Smart Contract.</p>

### Structure Of Invocation Transaction

<p>This is a transaction for a Smart Contract.</p>
<p>This transaction contains the byte column of a Smart Contract as a transaction to execute a Smart Contract, meaning it includes the compiled script.</p>
<p>This transaction runs on the Consensus Node and performs the function of the script in the VM and performs the function to return the results.</p>
<p>We will refer to the Smart Contract later.</p>

## Block Structure

<p>A blockchain can be viewed as a concatenated set of blocks.</p>
<p>Before we look at the structure of blocks, let us explain intuitively how blocks are concatenated in blockchains.</p>
<p>The block chaining method of blockchain is as follows.</p>

<center>![/quras-js/img](http://13.230.62.42/quras/img/whitepaper/StructureOfBlock.png)</center>
<center>Figure 4. Block Chaining Structure of Blocks</center>

<p>As mentioned above, the block consists of a large block header and a parameter of the block.</p>
<p>The block header contains block information, and the parameter of the block consists of a collection of the transaction.</p>
<p>Let's start by looking at the header of the block.</p>

### Block Header Structure

<p>Let's look at the header of the block and explain what it has to do.</p>

Items | Description
--- | --- 
Version | This is an item that considers when the header of a block is updated as an item indicating the version of the block.
Prev Hash | This item is an item indicating a hash value for a previous block.
Merkle Root | This is the Root Hash value of the Merkle Tree, which consists of leaves in the Hash of the transaction in the parameter of the block.
Time Stamp | Indicates the time when the block was generated.
Index | Indicates the length of the block.
Consensus Data | It means the Nonce value of the Node that generated the block.
Next Consensus | This is the Script Hash value of the Consensus Node, which has the authority to generate the next block.
Script | Shows the validation Script for a block.
<center>Table 15. Block Structure</center> <br/>

<p>There is an item called the Merkle Root in the header of the block.</p>
<p>The meaning of this item is as follows:</p>
<p>The block generator forms the Merkle Tree by the Hash value of the transaction contained in the block.</p>
<p>Then the RootHash value of the Merkle Tree is assigned to this Merkle Root item.</p>
<p>All nodes can be verified by the Merkle Root calculation method for the wrong transaction of the transaction contained in the block.</p>
<p>The following is an intuitive explanation of how to build the Merkle Tree in the transaction.</p>
<p>Suppose that a block has 7 transactions as an example.</p>
<p>Let's say that the Hash of these 7 transactions is A, B, C, D, E, F, and G.</p>
<p>In this case, the Merkle Root value will be calculated as shown in the following figure:</p>

<center>![/quras-js/img](http://13.230.62.42/quras/img/whitepaper/MerkleRootConfiguration.png)</center>
<center>Figure 5. Merkle Root Configuration</center>

<p>If you download the parameter of a block from another node and you accidentally receive the contents of the parameter, the Merkle Root Value for the parameter will change from the Merkle Root value for the header.</p>
<p>You can find it through the following figure:</p>

<center>![/quras-js/img](http://13.230.62.42/quras/img/whitepaper/SearchingErrorsInMerkleTree.png)</center>
<center>Figure 6. Searching for Errors in the MerkleTree</center>

<p>In this case, it can easily be obtained through the Merkle Tree, whether its transaction is wrong or not.</p>
<p>That is, the node can use the Merkle Tree to download and validate the block header and block parameter from a number of nodes without a single node.</p>
<p>There is a lot of literature on the Merkle Root, so please refer to them. [2], [3]</p>

### Block Parameter Structure

<p>The parameter of a block is a collection of transactions.</p>
<p>It will include the transaction, meaning all types of transaction.</p>

### Block Validation Method

<p>The verification method of the block is as follows:</p>
<p>The block verification procedure first advances verification to the block header and then advances the verification to the parameter.</p>
<p>Let's look at the verification for the block header.</p>

#### Verifying Block Header

<p>The verification procedure for the header of the block is as follows.</p>

  1)	Restore True Value if the hash value of the current block is the hash value of the Genesis Block.
  2)	Restore True Value if the Hash value of the block is already contained in a Local Block.
  3)	Restore False Value if the block header corresponding to the PrevHash Value of the current block is not in the Local Blockchain.
  4)	Restore False Value if the Index Value of the block header corresponding to the PrevHash Value is equal to or greater than the Index Value of the current block by 2.
  5)	Restore False Value if the Timestamp of the block header corresponding to the PrevHash Value is larger than the Timestamp of the current block.
  6)	Lastly, Restore False Value if the script fails after proceeding with the validation of the script for the block.

<p>If the validation for the block header fails to validate the block's parameter, then the validation of the block's parameter will not proceed.</p>

#### Verifying Block Parameter

<p>The verification procedure for the block parameter is as follows:</p>

  1)	Restore False Value if the first transaction has no Miner Transaction, or the Miner Transaction is located at least in the second index in the list of transactions.
  2)	Check if the Next Consensus item corresponding to the transaction is calculated correctly, and if not, restore False Value. 
  3)	Check to see the aggregate results of the transactions and the amount of Miner Transaction and restore False Value if the results differ.

<p> If all of the above verifications succeed, the node recognizes that the block validation succeeded, and accepts the blocks in the Local Blockchain.</p>

## Structure Of Smart Contract

<p>The concept of Smart Contract is originally proposed by Nick Szubo in 1994. When a contract was written in documents and the real person had to carry out according to the contract, but he insisted that the contract could be automatically executed if the contract was made with a digital command.</p>
<p>The contract result according to the condition is apparent in the digital agreement, and the contract contents can be carried out immediately.</p>
<p>When you decide to create and execute a digital agreement, and you will no longer need a third-party trust authority to execute the contract.</p>
<p>As of 1994, the digital smart contracts existed as a concept and had not been introduced into the field of operational services.</p>
<p>The advent of the concept of blockchain has led to the creation of an environment where smart contracts can be made.</p>
<p>In the QURAS Blockchain, the Smart Contract was designed to allow users to create and use contract terms directly in addition to such digital contracts.</p>
<p>In other words, all of the platforms are provided for the users to use the QURAS Smart Contract language to develop their own Smart Contracts so that they can run on the QURAS Blockchains.</p>
<p>Now, let's take a look at the Smart Contract execution procedures for the QURAS Blockchains.</p>

  1) Smart users create Smart Contract using the Smart Contract creation language supported by the QURAS Blockchain.
  The Smart Contract language supported by the QURAS Blockchain is C#.
  Users can create Smart Contracts in a visual studio environment using the Smart Contract Framework, which is supported by the QURAS Development Team.
  2) After Smart Contract is created, the Smart Contract Compiler is used to build the corresponding Smart Contract and obtain the bytecode.
  The QURAS Development Team provides a compiler that allows users to develop Smart Contracts into themselves.
  Users will register the QURAS Smart Contract Plugin and other compilers with the system in a visual studio environment and make it available for use.
  3) Once the build bytecode is prepared, the user deploys the Smart Contract to the QURAS Blockchain.
  The user generates a transaction that registers the bytecode which is built from the wallet or dedicated tool that supports Smart Contract in a blockchain.
  4) The Miner runs the Smart Contract Script and registers it in the QURAS Blockchains if there is no error.
  When the Miner generates a Smart Contract Transaction, it would be added to the block and then registered to the blockchain if the Smart Contract bytecode is executed by the Smart Contract VM and succeeded. 
  5) After the Smart Contract has been deployed, the user can use the Smart Contract Script Hash to call functions, etc.

<p>The structure of a Smart Contract can be viewed as a combination of opcode that is provided by the QURAS Smart Contract VM.</p>
<p>When a Smart Contract created by a user becomes compiled, it changes to bytecode changed by the opcode.</p>
<p>The QURAS Development Team will periodically advance updates to the Smart Contract VMs to provide a convenient Smart Contract creation environment for users.</p>
<p>Now let's take a look at the structure of the Smart Contract.</p>
<p>The Smart Contract is simple in structure as a byte column in opcode.</p>
<p>All the opcode in the byte column will be parsed and executed by the node's VM.</p>
<p>For the opcode meaning and the QURAS Smart Contract libraries, refer to the following topics.</p>

## Structure Of LevelDB

<p>The blockchain management on all nodes is proceeded by using the LevelDB.</p>
<p>Unlike other SQL databases, LevelDB is distinguished from other SQL databases in terms of DB in the Key-Value format.</p>
<p>Unlike SQL, LevelDB has a storage structure of the Key-Value format. [4] [5] [6]</p>
<p>The performance of the LevelDB is as follows:</p>
<p>Generally, it has excellent performance when compared to the SQLite and the Kyoto Cabinet Tree DB.</p>
<p>But there was a decline in the performance in the results of areas where big data was used.</p>
<p>In other words, the excellent performance has been displayed in the value of LevelDB is about 100 bytes.</p>
<p>If the value item is within this range, it will be suitable to use in the local, because it is superior in the performance.</p>
<p>See reference for more specific information on the LevelDB.</p>
