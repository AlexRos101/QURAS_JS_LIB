---
id: wp-cryptomodules
title: Crypto Modules
---

<p>The QURAS Blockchain implemented the anonymization of the transaction by realizing the encryption of the transaction contents.</p>
<p>The basic problem of anonymizing transactions is how to verify the contents of the encrypted transaction from the Consensus Node.</p>
<p>That is, the Consensus Node must be able to prove that the encrypted transactions are accurate without the use of decryption keys for encrypted transactions.</p>
<p>In order to implement this, the Zero-Knowledge Proof, a zero-knowledge encryption algorithm, can be used to verify the accuracy of encrypted transactions even without a real decryption key (private key) on the Consensus Node.</p>
<p>The ZK - SNARKS is a module that implements this ZKP.</p>
<p>Let's start by looking at the concept of Zero-Knowledge Proof.</p>

## Zero Knowledge Proof

<p>The zero-knowledge proof method is a cryptographic theory, which proves what kind of equation is true to the opponent without exposing any information.</p>
<p>A prover is the one which tries to prove that any kind of equation is true, and the one which participates in a certification process and exchanges information with a prover is called a verifier.</p>
<p>When a prover participates in a zero-knowledge certificate and modifies a protocol with the purpose of cheating the verifier, the prover is untruthful, otherwise truthful.</p>
<p>The zero-knowledge proofs must satisfy such as the following 3 properties:</p>

  1.	Completeness: If any kind of equation is true, a truthful prover must be able to prove that the equation is true to a truthful verifier.
  2.	Soundness: If any kind of equation is false, any untruthful prover must convince an untruthful verifier that the equation is true.
  3.	Zero-Knowledge: If any kind of equation is true, the verifier must know nothing except for the authenticity of the equation.

<p>The zero-knowledge proofs depend on the probability theory.</p>
<p>A typical example is the Ali Baba cave problem.</p>
<p>That is to say if the number of proof execution increases between the prover and the verifier, the accuracy of the proof of the equation becomes higher.</p>
<p>However, it is inconvenient to use the proof of execution between the prover and the verifier in the QURAS Blockchain.</p>
<p>The proof method based on the probability theory becomes the Interactive Zero Knowledge Proof.</p>
<p>That is to say, it is an algorithm which judges true and false of the equation as the probability of true and false by carrying out the execution many times.</p>
<p>Such a system causes various problems such as a load on the network.</p>
<p>Then, the concept of non-interactive zero-knowledge came out. [7] [8]</p>
<p>The verification for proof, however, is due to the estimation of the calculation.</p>
<p>Non-interactive zero-knowledge proof is a method to perform verification without interacting with the prover as a type of ZKF.</p>
<p>ZK-SNARK (Zero-Knowledge Succinct Non-interactive Argument of Knowledge) is a concept brought up by non-interactive zero-knowledge proof, and it is also used in the Z cash.</p>
<p>Since there are many publications related to zero-knowledge, please refer to the reference to the specific contents.</p>

## ZK-SNARKS Concept

<p>ZK-SNARK (Zero-Knowledge Succint Non-interactive Argument of Knowledge) does not exchange any information between the prover and the verifier, however, the prover creates a proof scheme and provides a module that can be varified by the verifier. As an example, in the provider of that proof scheme, there is an algorithm that can be used to inform that it has the Secret Key.</p>
<p>At this time, the verifier will not be able to find any information, such as the prover’s Secret key in the proof scheme.</p>
<p>The ZKP (Zero-Knowledge Proof) is a method in which the prover verifies that a proof scheme is correct without giving any related information.</p>
As an example, if the Hash Value B for random number A can be used, at some point, to verify to the verifier that the prover knows that A corresponds to the Hash Value B, without showing A Value.</p>
<p>The Proof of Knowledge in zero-knowledge is a method which makes it clear that not only has A in the verifier, but it also that the value is accurate without showing A.</p>
<p>In Succinct ZKP, the verifier can determine whether the prover's proof is true or false, regardless of its length, in a short period of time (some ms second).</p>
<p>The Interactive ZKP was able to end up with proof originally after a couple of times the prover and the verifier had been able to communicate.</p>
<p>Therefore, the verifier sent a variety of commands to the prover for verification, and it was possible to determine true and false probability of a certificate based on the probability theory.</p>
<p>In this case, the prover is designed so that the prover's secret data can not be found as a command sent by the prover or a command sent by the verifier.</p>
<p>However, the Non-interactive ZKP allows only one command between the prover and the verifier to be used to determine the true and false authenticity of a verification scheme.</p>
<p>In order to implement the Non-interactive ZKP, the Public Parameter aiming at zero-knowledge algorithm between the prover and the verifier needs to be shared.</p>
<p>The QURAS Development Team will proceed for the key, and it will commonly be used in the QURAS Blockchains.</p>

## Implementation Of The Principle Of ZK-SNAKRS

<p>First, before knowing the principle of ZK-SNARKS, let’s look at the Transparent Transaction in QURAS Blockchain, and see whether we can use the ZK-SNARKS for an item to implement the anonymous.</p>
<p>A typical Transparent Transaction is viewed from a Contract Transaction structure.</p>
<p>The basic input in the Contract Transaction is the Coin Reference information, and it is an item of output and the Transaction Output.</p>
<p>From, To, and Amount information for the Transparent Transactions in a QURAS Blockchain is derived from the items in the Contract Transaction's Coin Reference and the Transaction Output.</p>
<p>Let's look at how From, To, and Amount can be determined from the items in Contract Transaction's Coin Reference and Transaction Output.</p>
<p>In the Contract Transaction structure, Coin Reference is a reference to the Transaction output of the previous Transaction.</p>
<p>In other words, you can deduce Coin Reference from blockchain data to easily obtain the item of the Transaction Output that Coin Reference represents.</p>
<p>The item in the Transaction Output has 3 items: AssetID, Value, and Script Hash.</p>
<p>That is, the Script Hash of the item in the Transaction Output pointed to by the Coin Reference is From's address.</p>
<p>Then, the Script Hash of the Transaction Output item in the Contract transaction will show the final balance status.</p>
<p>That is, the address of To and the amount of remittance can be confirmed by this item.</p>
<p>All the items in the Contract Transaction are not encrypted, but they are registered in the blockchain as they are, so that the node can accurately check whether the resulting transaction could accurately calculate From, To, and Amount, and check the sign value to see if the transaction was forged or not.</p>
<p>Now, you'll find out about the part of the Anonymous Transaction that needs base encryption.</p>
<p>The parts that must be encrypted in the Anonymous Transaction are the Coin Reference and items in the Transaction Output.</p>
<p>Using a zero-knowledge proof algorithm for this part will not allow a node to speculate on From, To, or Amount of money, so that the anonymization of the transaction can be implemented.</p>
<p>So, let’s move on to how the Coin Reference and the Transaction Output in encrypted, and then how it try to figure out what other nodes can verify that it is accurate.</p>

## Ring Signature Concept

## Implementation Of Ring Signature Principles

