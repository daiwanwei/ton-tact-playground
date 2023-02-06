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
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey});
    let walletContract = client4.open(wallet);
    console.log(`------------info of wallet contract-------------`)
    console.log(`wallet contract address : ${walletContract.address}`)
    console.log(`wallet contract balances : ${await walletContract.getBalance()}`)
    console.log(`------------------------------------------------`)
    if (await walletContract.getBalance()<1){
        throw new Error(`Insufficient wallet balance`)
    }
    const counterContract=client4.open(
        await Counter.fromInit(walletContract.address)
        );
    //TODO: check how much ton coin will be used
    await counterContract.send(walletContract.sender(keyPair.secretKey),{ value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); 
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