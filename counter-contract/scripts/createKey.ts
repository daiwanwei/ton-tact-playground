import {mnemonicToPrivateKey,mnemonicNew} from "ton-crypto";
import {WalletContractV4} from "ton";


async function main(){
    const mnemonics = await mnemonicNew();
    let keyPair = await mnemonicToPrivateKey(mnemonics);
    let workchain = 0;
    let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey});
    console.log(`-----------Below is your key information-----------`)
    console.log(`mnemonics : ${mnemonics.join(" ")}`)
    console.log(`expected wallet contract address (inactive) : ${wallet.address.toString()}`)
    console.log(`---------------------------------------------------`)
}


main()
    .then(()=>console.log(`exec successfully`))
    .catch((err)=>{
        console.log(`exec fail,err: ${err}`)
        process.exitCode=1
    }).finally(()=>process.exit())