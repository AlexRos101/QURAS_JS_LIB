export const ADDR_VERSION = '1f'

export const ASSET_ID = {
  QRS: '52a4b58d99af84e0ca33318f3724e92c14835d97af46714a4a68a098a3843276',
  QRG: '8ab6fec67e11099c1f64261667a1b0cff69b947869984411aa7238a661b22435'
}

export const CONTRACTS = {
  QEP1TOKEN: 'ecc6b20d3ccac1ee9ef109af5a7cdb85706b1df9'
}

export const DEFAULT_RPC = {
  MAIN: 'http://13.230.62.42:10030',
  TEST: 'http://13.112.100.149:10030'
}

export const DEFAULT_REQ = { jsonrpc: '2.0', method: 'getblockcount', params: [], id: 1234 }

export const ASSET_TYPE = {
  Token: 96,
  AnonymousToken: 97,
  TransparentToken: 98,
  Share: 144
}

export const DEFAULT_SCRYPT = {
  cost: 16384,
  blockSize: 8,
  parallel: 8,
  size: 64
}

export const DEFAULT_SYSFEE = {
  enrollmentTransaction: 1000,
  issueTransaction: 500,
  publishTransaction: 500,
  registerTransaction: 10000
}

export const DEFAULT_WALLET = {
  name: 'myWallet',
  version: '1.0',
  scrypt: {},
  accounts: [],
  extra: null
}

export const DEFAULT_ACCOUNT_CONTRACT = {
  'script': '',
  'parameters': [
    {
      'name': 'signature',
      'type': 'Signature'
    }
  ],
  'deployed': false
}

export const QURAS_NETWORK = {
  MAIN: 'MainNet',
  TEST: 'TestNet'
}

// specified by QEP1, same as bip38
export const QEP_HEADER = '0002'

export const QEP_FLAG = '19'

export const RPC_VERSION = '2.3.2'

export const TX_VERSION = {
  'CLAIM': 0,
  'CONTRACT': 0,
  'INVOCATION': 1,
  'ISSUE': 1
}
