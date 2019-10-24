/**
 * Created by dotFund on 9/4/2018.
 */

const axios = require('axios');
const Quras = require('../lib/index.js')
//const config = require('./createData.js')

Quras.logging.logger.setAll('info') // sets logging level of module-dev-js to 'info'
const apiLogger = Quras.logging.logger.getLogger('api') // gets the logger for the api package
apiLogger.setLevel('warn') // sets logging level only on the logger for the api package

//console.log(Quras.CONST.ASSETS)

const ico_account = new Quras.wallet.Account('b3bb07d55905375ab1eb923b2276e1ebf6903ce5770aed4b555e926910a9b126')
console.log('privkey : ' + ico_account.privateKey)
console.log('public key : ' + ico_account.publicKey)
console.log('address : ' + ico_account.address);

const myAccount = new Quras.wallet.Account()

console.log('Private Key : ' + myAccount.privateKey)
console.log('Public Key : ' + myAccount.publicKey)
console.log('Address : ' + myAccount.address)
console.log('MTP1 Private Key : ' + myAccount.MTP1)
console.log('Script Hash : ' + myAccount.scriptHash)

var pubKey = '03436a716bb42f8e094b06ba5a4e2112ca5f378a727356d8ec9dcc0aca7b15074f';
var scriptHash = Quras.wallet.getScriptHashFromPublicKey(pubKey);
var addr = Quras.wallet.getAddressFromScriptHash(scriptHash);

var scriptHash = Quras.wallet.getScriptHashFromAddress('Dqf3UKe1f5FBWduGxHp8RMqP29dL6DgGS1');

var checkAddr = Quras.wallet.isAddress('Dqf3UKe1f5FBWduGxHp8RMqP29dL6DgGS1');

var addrfromPriv = new Quras.wallet.Account('02bf9e9964a3c0421ad5a8dde06f848977c514fd5cc638434d567a05b87ade39');
console.log('Address : ' + addrfromPriv.address)

var addrToPriv = new Quras.wallet.Account('02bf9e9964a3c0421ad5a8dde06f848977c514fd5cc638434d567a05b87ade40');
console.log('Address : ' + addrToPriv.address)

const rpcServer = new Quras.rpc.RPCClient(Quras.CONST.QURAS_NETWORK.MAIN);
const testRpcServer = new Quras.rpc.RPCClient(Quras.CONST.QURAS_NETWORK.TEST);

var claims = [
    {txid: "0x4ec9c0b98d68c8061ca7236efe804107628652234e78b49baf8a993448370f36", vout: 1}
]
testRpcServer.getClaimAmount(claims);

rpcServer.getRawMemPool()
.then((data) => {
    console.log(data);
})
.catch((error) => {

});

Quras.api.qurasDB.getClaimInfo(Quras.CONST.QURAS_NETWORK.TEST, 'DknmAbcap8RnUpkLQvbXTwTXqFJMjN4QPz')
.then((data) => {
    var tx = Quras.tx.Transaction.createClaimTxWithQurasDB('DknmAbcap8RnUpkLQvbXTwTXqFJMjN4QPz', data);
})
.catch((error) => {
    console.log(error);
});

Quras.api.qurasDB.getBalance(Quras.CONST.QURAS_NETWORK.TEST, 'DnMVmxdNM46nTfxbTWPbrHr8zi16JWNA4x')
.then((data) => {
    console.log(data);
})
.catch((error) => {
    console.log(error);
});

console.log(rpcServer.version);

rpcServer.getBlockCount()
    .then((data) => {
        console.log('block count'  + data);
    })
    .catch ((error) => {
        console.log("error");
});

rpcServer.getBlock(5)
    .then((data) => {
        //console.log(data);
    })
    .catch ((error) => {
        console.log("error");
});

Quras.api.qurasDB.getTransactionHistory("MainNet", "DfViMgzECVTsqEfGvukHcbWEZQoeDZttYB")
    .then((data) => {
        console.log(data);
    })
    .catch ((error) => {
        console.log("error");
    });

function AddAsset() {
    var address = 'Do27ycn5urnJnWnNboiDh5i5PkAEFmvehd';
    var privKey = '02bf9e9964a3c0421ad5a8dde06f848977c514fd5cc638434d567a05b87ade39';
    var tokenName = 'DtToken';
    var totalSupply = 100000;
    var precision = 5;
    var OwnerPrivKey = '02bf9e9964a3c0421ad5a8dde06f848977c514fd5cc638434d567a05b87ade39';
    var admin = 'Do27ycn5urnJnWnNboiDh5i5PkAEFmvehd';
    var issuer = 'Do27ycn5urnJnWnNboiDh5i5PkAEFmvehd';
    Quras.api.qurasDB.deployAsset(Quras.CONST.QURAS_NETWORK.MAIN, address, privKey, Quras.CONST.ASSET_TYPE.Token, tokenName, totalSupply, precision, OwnerPrivKey, admin, issuer)
    .then((data) => {
        console.log(data)
    })
    .catch((error) => {
        console.log(error)
    })
}
//AddAsset()

function DeploySmartContract() {
    var address = 'Do27ycn5urnJnWnNboiDh5i5PkAEFmvehd';
    var privKey = '02bf9e9964a3c0421ad5a8dde06f848977c514fd5cc638434d567a05b87ade39';
    var script = '53c56b6c766b00527ac46c766b51527ac461616168124d6f64756c652e52756e74696d652e4c6f67616168194d6f64756c652e53746f726167652e476574436f6e746578740e48656c6c6f2046756e6374696f6e05576f726c6461527268124d6f64756c652e53746f726167652e50757461516c766b52527ac46203006c766b52c3616c7566';
    var param = '07';
    var returns = 5;
    var needStorage = true;
    var scName = 'HelloWorld';
    var version = '1.0.0.1';
    var author = 'dotFund';
    var mail = 'dotFund@outlook.com';
    var description = 'My First SC using JS Library.';

    Quras.api.qurasDB.deploySmartContract(Quras.CONST.QURAS_NETWORK.MAIN, address, privKey, script, param, returns, needStorage, scName, version, author, mail, description, 490)
    .then((data) => {
        console.log(data)
    })
    .catch((error) => {
        console.log(error)
    })
}
//DeploySmartContract()

/*
const tx = new Quras.tx.Transaction({
        type: 2,
        version: 2,
        attributes: [],
        shouldNotBeThere: false
      })
*/

/*
      privateKey : 02bf9e9964a3c0421ad5a8dde06f848977c514fd5cc638434d567a05b87ade39
      Address : Do27ycn5urnJnWnNboiDh5i5PkAEFmvehd

      ToPrivateKey : 02bf9e9964a3c0421ad5a8dde06f848977c514fd5cc638434d567a05b87ade40
      ToAddress : DZbNA3F3vrTk7kmmiywAVpJ4P5foGkVek7
*/
function SendCoin(){
    Quras.api.qurasDB.getBalance(Quras.CONST.QURAS_NETWORK.TEST, 'DfT1zQssU8v9abEvkaAAmMTRhbdRMppfUh') // Get the balance of from address.
    .then((data) => {
        const balance = new Quras.wallet.Balance(data)
        var scriptHash = Quras.wallet.getScriptHashFromAddress('DZnhQPZTVeSe1Z42iwcXg8ETHsfaY6mYbH'); // To address.
        const outputs = [{
                assetId: Quras.CONST.ASSET_ID['QRG'], // The type of coins that you want to send.
                value: 10, // Coin amount to send.
                fee: 0.5, // fee.
                scriptHash: scriptHash // The scripthash of "To address".
            }]
        
            const testTx = Quras.tx.Transaction.createContractTx(balance, outputs) // create a transaction.
        
            testTx.sign('e5dfe140ca209dfe6219d3d3d0ad2325dcd4f5978d459f86e29e5b02cf92ce09'); // Sign the transaction using private key
        
            testRpcServer.sendRawTransaction(testTx.serialize()) // Send the transaction to RPC Server.
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
}

SendCoin();

function IssueTx() {
    Quras.api.qurasDB.getBalance(Quras.CONST.QURAS_NETWORK.MAIN, 'Do27ycn5urnJnWnNboiDh5i5PkAEFmvehd') // Get the balance of from address.
    .then((data) => {
        const balance = new Quras.wallet.Balance(data)
        var scriptHash = Quras.wallet.getScriptHashFromAddress('DrnEEnU1RtNKkP6TBAx8FaUQN1t1ghYPJV'); // To address.
        const outputs = [{
                assetId: '7a1a8c541de4fb7753d077a17870943b6a622817d922f46017d239f8db5b5bec', // The type of coins that you want to send.
                value: 1, // Coin amount to send.
                scriptHash: scriptHash // The scripthash of "To address".
            }]
        
            const testTx = Quras.tx.Transaction.createIssueTx(balance, outputs, null, 1) // create a transaction.
        
            testTx.sign('02bf9e9964a3c0421ad5a8dde06f848977c514fd5cc638434d567a05b87ade39'); // Sign the transaction using private key
        
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
}
//IssueTx()

function do_invoke() {
    const sb = new Quras.sc.ScriptBuilder('00c1046e616d65675f0e5a86edd8e1f62b68d2b3f7c0a761fc5a67dc');
    const params = sb.toScriptParams();
    Quras.rpc.Query.invokeScript(sb.str)
    .execute(Quras.CONST.DEFAULT_RPC.MAIN)
    .then((res) => {
        console.log(res)
    });
}

//do_invoke();

function do_coinmarket() {
    Quras.api.cmc.getPrice("NEO", "usd")
    .then((data) => {
        console.log(data);
    })
    .catch ((error) => {
        console.log("error");
    });

    var Net = Quras.api.qurasDB.getAPIEndpoint("MainNet");
    console.log(Net);

    /*
    Quras.api.neoscan.getBalance("MainNet", "AZCcft1uYtmZXxzHPr5tY7L6M85zG7Dsrv")
    .then((data) => {
        console.log(data);
    })
    .catch ((error) => {
        console.log("error");
    });
    */

    Quras.api.qurasDB.getBalance("MainNet", "2BV5Epr7CUnLpFCBVi2LVsP3z4xcuTSFytzXp54phm4")
    .then((data) => {
        console.log(data);
    })
    .catch ((error) => {
        console.log("error");
    });

    
    Quras.api.qurasDB.getTransactionHistory("MainNet", "DknmAbcap8RnUpkLQvbXTwTXqFJMjN4QPz")
    .then((data) => {
        console.log(data);
    })
    .catch ((error) => {
        console.log("error");
    });
    
    Quras.api.qurasDB.getRPCEndpoint("MainNet")
    .then((data) => {
        console.log(data);
    })
    .catch ((error) => {
        console.log("error");
    });
}

//do_coinmarket();

function RegisterProviderInfo()
{
    Quras.api.qurasDB.getBalance('MainNet', "2BV5Epr7CUaQs9khfU4zEKj51bmc6bpEVXdxz5UPNBn")
    .then ((balance) => {
        const bal = new Quras.wallet.Balance(balance)
    
        /*
        const outputs = [{
            assetId: Quras.CONST.ASSET_ID['MOD'],
            value: 2,
            scriptHash: '7a38e764c0f38277e7da8f5c19eae5143bab5a1c'
        }]

        var script = '0c7769746864726177486f6c6414fcf0ddef25dd21b5ac447e924aca08403d08801352c10c476574506172616d6574657267108165121dea07d875a532c6b8a3d91390fe5f8c';

        const sb = new Quras.sc.ScriptBuilder(script);
        const params = sb.toScriptParams();
        Quras.rpc.Query.invokeScript(sb.str)
        .execute(Quras.CONST.DEFAULT_RPC.MAIN)
        .then((res) => {
            console.log(res)
        });

        Quras.api.qurasDB.getParameter(Quras.CONST.DEFAULT_RPC.MAIN, 'fcf0ddef25dd21b5ac447e924aca08403d088013', 'withdrawHold')
        .then ((data) => {
            console.log(data);
        })

        */

        Quras.api.qurasDB.getProviderInfo(Quras.CONST.DEFAULT_RPC.MAIN, '2BV5Epr7CUaQs9khfU4zEKj51bmc6bpEVXdxz5UPNBn', 'withdrawHold')
        .then ((data) => {
            console.log(data);
        })
        
        /*
        Quras.api.qurasDB.setProviderInfo(Quras.CONST.DEFAULT_RPC.MAIN, balance, '7f1e0b95adabf5b0baf01adbd7a5cc43418529a5729ecc977c091fc60e45d5af', '2BV5Epr7CUaQs9khfU4zEKj51bmc6bpEVXdxz5UPNBn', '10000', '100', '192.168.1.1', '3000', '100', '100', '100', '100')
        .then ((data) => {
            console.log(data);
        })
        .catch ((error) => {
            console.log(error);
        })
        */

       Quras.api.qurasDB.depositCollateral(Quras.CONST.DEFAULT_RPC.MAIN, balance, '7f1e0b95adabf5b0baf01adbd7a5cc43418529a5729ecc977c091fc60e45d5af', '2BV5Epr7CUaQs9khfU4zEKj51bmc6bpEVXdxz5UPNBn', 3)
       .then ((data) => {
            console.log(data);
       })
       .catch ((error) => {

       })
    })
    .catch ((error) => {

    });

    // File Contract
    Quras.api.qurasDB.getBalance('MainNet', "2BV5Epr7CUVshjH3LjPBvRXuRwymgqvAdkrswqxuVQT")
    .then ((balance) => {
        var merkleHash = '109c5bd496607dff0b3b1b4e6c9da8a096f0d55c138d853264ccc836d67ab990';
        Quras.api.qurasDB.setFileContract(Quras.CONST.DEFAULT_RPC.MAIN, balance, '109c5bd496607dff0b3b1b4e6c9da8a096f0d55c138d853264ccc836d67ab999', '2BV5Epr7CUVshjH3LjPBvRXuRwymgqvAdkrswqxuVQT', '2BV5Epr7CUaQs9khfU4zEKj51bmc6bpEVXdxz5UPNBn', merkleHash, 100, 1000, 3, 5, 10, 20)
        .then ((data) => {
            console.log(data);
        })
        .catch ((error) => {
            console.log(error);
        })
    })
    .catch ((error) => {

    });
}

//RegisterProviderInfo();

function RegProvider()
{
    Quras.api.qurasDB.getBalance('MainNet', "2BV5Epr7CUaQs9khfU4zEKj51bmc6bpEVXdxz5UPNBn")
    .then ((balance) => {
        Quras.api.qurasDB.setProviderInfo(Quras.CONST.DEFAULT_RPC.MAIN, balance, '7f1e0b95adabf5b0baf01adbd7a5cc43418529a5729ecc977c091fc60e45d5af', '2BV5Epr7CUaQs9khfU4zEKj51bmc6bpEVXdxz5UPNBn', '10000', '100', '192.168.1.1', '3000', '5', '10000', '5', '5')
        .then ((data) => {
            console.log(data);
        })
        .catch ((error) => {
            console.log(error);
        })
    });
}

//RegProvider();

function RegFileContract()
{
    Quras.api.qurasDB.getBalance('MainNet', "2BV5Epr7CUVshjH3LjPBvRXuRwymgqvAdkrswqxuVQT")
    .then ((balance) => {
        var merkleHash = '109c5bd496607dff0b3b1b4e6c9da8a096f0d55c138d853264ccc836d67ab990';
        Quras.api.qurasDB.setFileContract(Quras.CONST.DEFAULT_RPC.MAIN, balance, '109c5bd496607dff0b3b1b4e6c9da8a096f0d55c138d853264ccc836d67ab999', '2BV5Epr7CUVshjH3LjPBvRXuRwymgqvAdkrswqxuVQT', '2BV5Epr7CUaQs9khfU4zEKj51bmc6bpEVXdxz5UPNBn', merkleHash, 100, 2048, 3, 5, 10, 20)
        .then ((data) => {
            console.log(data);
        })
        .catch ((error) => {
            console.log(error);
        })
    })
    .catch ((error) => {

    });
}

//RegFileContract();

function Accept()
{
    Quras.api.qurasDB.getBalance('MainNet', "2BV5Epr7CUaQs9khfU4zEKj51bmc6bpEVXdxz5UPNBn")
    .then ((balance) => {
        Quras.api.qurasDB.acceptFileContract(Quras.CONST.DEFAULT_RPC.MAIN, balance, '7f1e0b95adabf5b0baf01adbd7a5cc43418529a5729ecc977c091fc60e45d5af', '56647132ae732a0f4ffeb30761db84bc471a6137e851001f5fddc7c61e3f41e2', '2BV5Epr7CUaQs9khfU4zEKj51bmc6bpEVXdxz5UPNBn')
        .then ((data) => {
            console.log(data);
        })
        .catch ((error) => {
            console.log(error);
        })
    });
}

//Accept();