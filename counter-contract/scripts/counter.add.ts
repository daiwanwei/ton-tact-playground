import {Counter} from "../sources/output/sample_Counter"
import { Address,TonClient4 ,WalletContractV4,toNano} from "ton";
import {getKeyFromEnv} from "./utils/key";
import * as dotenv from 'dotenv'
dotenv.config()

async function main(){
    const client4 = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com"
    })
    let keyPair = await getKeyFromEnv()
    let secretKey = keyPair.secretKey;
    let workchain = 0;
    let walletContract = client4.open(
        WalletContractV4.create({ workchain, publicKey: keyPair.publicKey})
        );
    // Replace your counter address
    const counterAddress="EQAcV9Ux1QzL8VInDjDq3rgC4inlv2m7HSqz1vX1r9JVRDsh"
    const counterContract=client4.open(
        Counter.fromAddress(Address.parse(counterAddress))
        );
    console.log(`wallet contract address : ${walletContract.address}`)
    console.log(`wallet contract balances : ${await walletContract.getBalance()}`)
    console.log(`------------------------------------------------`)
    if (await walletContract.getBalance()<1){
        throw new Error(`Insufficient wallet balance`)
    }
    //TODO: check how much ton coin will be used
    await counterContract.send(walletContract.sender(secretKey),{ value: toNano(1) }, "increment");
    console.log(`-----------Below is counter contract information-----------`)
    console.log(`wallet contract address : ${walletContract.address}`)
    console.log(`wallet contract balances : ${await walletContract.getBalance()}`)
    console.log(`counter contract address : ${counterContract.address}`)
    // console.log(`count on counter contract : ${await counterContract.getCounter()}`)
    console.log(`---------------------------------------------------`)
}


main()
    .then(()=>console.log(`exec successfully`))
    .catch((err)=>{
        console.log(`exec fail,err: ${err}`)
        process.exitCode=1
    }).finally(()=>process.exit())