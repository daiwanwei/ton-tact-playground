import {Counter} from "../sources/output/sample_Counter"
import { Address,TonClient4 ,WalletContractV4,toNano,internal} from "ton";
import {getKeyFromEnv} from "./utils/key";
import * as dotenv from 'dotenv'
dotenv.config()

async function main(){
    const client4 = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com"
    })
    let keyPair = await getKeyFromEnv()
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey});
    let walletContract = client4.open(wallet);
    let seqno: number = await walletContract.getSeqno();
    console.log(`------------info of wallet contract-------------`)
    console.log(`wallet contract address : ${walletContract.address}`)
    console.log(`wallet contract balances : ${await walletContract.getBalance()}`)
    console.log(`------------------------------------------------`)
    if (await walletContract.getBalance()<0.5){
        throw new Error(`Insufficient wallet balance`)
    }
    //TODO: check how much ton coin will be used
    await walletContract.sendTransfer({
        seqno,
        secretKey:keyPair.secretKey,
        messages: [internal({
            value: '0.5',
            to: 'EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N', //Official address to use when creating a wallet
            body: 'Hello world'
        })],
    });
    console.log(`------------create wallet successfully!-------------`)
    console.log(`------------info of wallet contract-------------`)
    console.log(`wallet contract address : ${walletContract.address}`)
    console.log(`wallet contract balances : ${await walletContract.getBalance()}`)
    console.log(`------------------------------------------------`)
}


main()
    .then(()=>console.log(`exec successfully`))
    .catch((err)=>{
        console.log(`exec fail,err: ${err}`)
        process.exitCode=1
    }).finally(()=>process.exit())