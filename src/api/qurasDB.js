import axios from 'axios'

import { Balance, getPublicKeyFromPrivateKey, getScriptHashFromAddress } from '../wallet'
// import { Account, Balance, Claims } from '../wallet'
import { Transaction } from '../transactions'
// import { Transaction, TxAttrUsage } from '../transactions'
import { RPCClient } from '../rpc'
// import { RPCClient, Query } from '../rpc'
import { ASSET_ID } from '../consts'
import { Fixed8 } from '../utils'
import { networks, httpsOnly, timeout } from '../settings'
import logger from '../logging'
import {raceToSuccess} from './common'
import { generateAsset, generateDeployScript } from '../sc'
// import {ContractParam, createScript, ScriptBuilder} from '../sc'
// import { BigNumber } from 'bignumber.js'

const log = logger('api')
export const name = 'qurasDB'

var cachedRPC = null
/**
 * API Switch for MainNet and TestNet
 * @param {string} net - 'MainNet', 'TestNet', or custom module-wallet-db URL.
 * @return {string} URL of API endpoint.
 */
export const getAPIEndpoint = net => {
  if (networks[net]) return networks[net].extra.qurasDB
  return net
}

/**
 * Get balances of QRS and QRG for an address
 * @param {string} net - 'MainNet' or 'TestNet'.
 * @param {string} address - Address to check.
 * @return {Promise<Balance>} Balance of address
 */
export const getBalance = (net, address) => {
  const apiEndpoint = getAPIEndpoint(net)

  // var rpcServer = new RPCClient(net)

  // var error_promise = new Promise(function(resolve, reject) {
  //  throw 'Get pending transaction was failed'
  // });

  // rpcServer.getRawMemPool()
  // .then((mem_txs) => {
  //   console.log(mem_txs)
  // })
  // .catch((error) => {
  //   return error_promise;
  // });

  return axios.get(apiEndpoint + '/v1/address/balance/' + address)
    .then(res => {
      var balance = res.data.data.balance
      const bal = new Balance(balance)
      log.info(`Retrieved Balance for ${address} from modscan ${net}`)
      return bal
    })
}

/**
 * Get balances of QRS and QRG for an address
 * @param {string} net - 'MainNet' or 'TestNet'.
 * @param {string} address - Address to check.
 * @return {Promise<Balance>} Balance of address
 */
export const getClaimInfo = (net, address) => {
  const apiEndpoint = getAPIEndpoint(net)

  return axios.get(apiEndpoint + '/v1/addresses/' + address)
    .then(res => {
      var unclaimed = res.data.unclaimed
      return unclaimed
    })
}

/**
 * Get the current height of the light wallet DB
 * @param {string} net - 'MainNet' or 'TestNet'.
 * @return {Promise<number>} Current height.
 */
export const getWalletDBHeight = net => {
  const apiEndpoint = getAPIEndpoint(net)
  return axios.get(apiEndpoint + '/v1/block/height').then(response => {
    return parseInt(response.data.block_height)
  })
}

/**
 * Get transaction history for an account
 * @param {string} net - 'MainNet' or 'TestNet'.
 * @param {string} address - Address to check.
 * @return {Promise<PastTransaction[]>} a list of PastTransaction
 */
export const getTransactionHistory = (net, address) => {
  const apiEndpoint = getAPIEndpoint(net)
  return axios
    .get(apiEndpoint + '/v1/address/history/' + address)
    .then(response => {
      return response.data.data.history.map(rawTx => {
        var assetType = 'XQG'
        if (rawTx.asset === '0x' + ASSET_ID['QRG']) {
          assetType = 'XQG'
        } else if (rawTx.asset === '0x' + ASSET_ID['QRS']) {
          assetType = 'XQC'
        } else {
          assetType = rawTx.asset
        }

        var balance = 0
        var vouts = JSON.parse(rawTx.vout)
        vouts.forEach(vout => {
          if (vout.address !== rawTx._from) {
            balance += Number(vout.value)
          }
        })
        return {
          from: rawTx._from,
          to: rawTx._to,
          txType: rawTx.tx_type,
          blockHeight: new Fixed8(rawTx.block_number),
          txid: rawTx.txid,
          asset: assetType,
          amount: balance,
          timestamp: rawTx.time
        }
      })
    })
}

/**
 * Returns an appropriate RPC endpoint retrieved from a ModScan endpoint.
 * @param {string} net - 'MainNet', 'TestNet' or a custom ModScan-like url.
 * @return {Promise<string>} - URL
 */
export const getRPCEndpoint = net => {
  const apiEndpoint = getAPIEndpoint(net)
  return axios.get(apiEndpoint + '/v1/nodes/rpc')
    .then(res => {
      var data = res.data.data.nodes
      let nodes = data.sort((a, b) => b.height - a.height)
      if (httpsOnly) nodes = nodes.filter(n => n.url.includes('https://'))
      if (nodes.length === 0) throw new Error('No eligible nodes found!')
      const heightThreshold = nodes[0].height - 1
      const goodNodes = nodes.filter(n => n.height >= heightThreshold)
      const urls = goodNodes.map(n => n.url)
      if (urls.includes(cachedRPC)) {
        return new RPCClient(cachedRPC).ping().then(num => {
          if (num <= timeout.ping) return cachedRPC
          cachedRPC = null
          return getRPCEndpoint(net)
        })
      }
      const clients = urls.map(u => new RPCClient(u))
      return raceToSuccess(clients.map(c => c.ping().then(_ => c.net)))
    })
    .then(fastestUrl => {
      cachedRPC = fastestUrl
      return fastestUrl
    })
}

/**
 * Returns the asset id.
 * @param {string} net - 'MainNet', 'TestNet' or a custom ModScan-like url.
 * @param {string} fromAddress - The address that publish the asset.
 * @param {string} privKey - Private key that using publish the asset.
 * @param {string} assetType - Asset type.
 * @param {string} assetName - Asset name.
 * @param {number} assetAmount - Asset amount.
 * @param {number} assetPrecision - Asset precision.
 * @param {string} assetOwner - Asset owner.
 * @param {string} assetAdmin - Asset admin.
 * @param {string} assetIssuer - Asset issuer.
 * @returns {string-Hex} - Asset ID.
 */
export const deployAsset = (net, fromAddress, privKey, assetType, assetName, assetAmount, assetPrecision, assetOwner, assetAdmin, assetIssuer) => {
  return getBalance(net, fromAddress)
    .then((data) => {
      try {
        var ownerScriptHash = getPublicKeyFromPrivateKey(assetOwner)
        var adminScriptHash = getScriptHashFromAddress(assetAdmin)
        var issuerScriptHash = getScriptHashFromAddress(assetIssuer)
        var amount = assetAmount * 100000000
        const balance = new Balance(data)
        const sb = generateAsset(assetType, assetName, amount, assetPrecision, ownerScriptHash, adminScriptHash, issuerScriptHash)
        const invocationTx = Transaction.createInvocationTx(balance, null, sb.str, 4990)
        invocationTx.sign(privKey)
        var rpcServer = new RPCClient(net)
        return rpcServer.sendRawTransaction(invocationTx.serialize())
          .then((data) => {
            var returnData = {status: data, txHash: invocationTx.hash}
            return returnData
          })
          .catch((error) => {
            throw new Error(error)
          })
      } catch (ex) {
        throw new Error(ex)
      }
    })
    .catch((error) => {
      throw new Error(error)
    })
}

export const deploySmartContract = (net, fromAddress, privKey, script, paramList, returnType, needStorage, name, version, author, email, description, qrg) => {
  return getBalance(net, fromAddress)
    .then((data) => {
      try {
        const balance = new Balance(data)
        const sb = generateDeployScript({
          script: script,
          name: name,
          version: version,
          author: author,
          email: email,
          description: description,
          needsStorage: needStorage,
          returnType: returnType,
          paramaterList: paramList
        })
        const invocationTx = Transaction.createInvocationTx(balance, null, sb.str, qrg)
        invocationTx.sign(privKey)
        var rpcServer = new RPCClient(net)
        return rpcServer.sendRawTransaction(invocationTx.serialize())
          .then((data) => {
            var returnData = {status: data, txHash: invocationTx.hash}
            return returnData
          })
          .catch((error) => {
            throw new Error(error)
          })
      } catch (ex) {
        throw new Error(ex)
      }
    })
    .catch((error) => {
      throw new Error(error)
    })
}
