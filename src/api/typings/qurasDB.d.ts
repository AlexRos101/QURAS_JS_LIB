import { Balance, Claims } from '../../wallet'
import { RPCResponse } from '../../rpc'
import { Fixed8 } from '../../utils'
import { signingFunction, net, AssetAmounts, PastTransaction } from './core';
import { BigNumber } from 'bignumber.js';

/** API Switch for MainNet and TestNet */
export function getAPIEndpoint(net: net): string

/** Get balances of QRS and QRG for an address */
export function getBalance(net: net, address: string): Promise<Balance>

/** Get balances of QRS and QRG for an address */
export function getClaimInfo(net: net, address: string): Promise<Balance>

/** Get amounts of available (spent) and unavailable claims. */
export function getClaims(net: net, address: string): Promise<Claims>

/** Gets the maximum amount of gas claimable after spending all QRG. */
export function getMaxClaimAmount(net: net, address: string): Promise<Fixed8>

/** Returns the best performing (highest block + fastest) node RPC. */
export function getRPCEndpoint(net: net): Promise<string>

/** Get transaction history for an account */
export function getTransactionHistory(net: net, address: string): Promise<PastTransaction[]>

/** Get the current height of the light wallet DB */
export function getWalletDBHeight(net: net): Promise<number>

/** DEPRECATED: use claimGas instead */
export function doClaimAllGas(
  net: net,
  privateKey: string
): Promise<RPCResponse>

/** DEPRECATED: use claimGas instead */
export function doClaimAllGas(
  net: net,
  publicKey: string,
  signingFunction: signingFunction
): Promise<RPCResponse>

/** DEPRECATED: Call mintTokens for RPX */
export function doMintTokens(
  net: net,
  scriptHash: string,
  fromWif: string,
  qrs: number,
  gasCost: number
): Promise<RPCResponse>

/** DEPRECATED: Call mintTokens for RPX */
export function doMintTokens(
  net: net,
  scriptHash: string,
  publicKey: string,
  qrs: number,
  gasCost: number,
  signingFunction: signingFunction
): Promise<RPCResponse>

/** DEPRECATED: Send an asset to an address */
export function doSendAsset(
  net: net,
  toAddress: string,
  from: string,
  assetAmounts: AssetAmounts
): Promise<RPCResponse>

/** DEPRECATED: Send an asset to an address */
export function doSendAsset(
  net: net,
  toAddress: string,
  publicKey: string,
  assetAmounts: AssetAmounts,
  signingFunction: signingFunction
): Promise<RPCResponse>

/** Add asset on blockchain */
export function deployAsset(
  net: net,
  fromAddress: string,
  privKey: string,
  assetType: string,
  assetName: string,
  assetAmount: number,
  assetPrecision: number,
  assetOwner: number,
  assetAdmin: number,
  assetIssuer: string
): Promise<RPCResponse>

/** Deploy Smart Contract */
export function deploySmartContract(
  net: net,
  fromAddress: string,
  privKey: string,
  script: string,
  paramList: string,
  returnType: number,
  need_storage: boolean,
  name: string,
  version: string,
  author: string,
  email: string,
  description: string,
  qrg: number
): Promise<RPCResponse>