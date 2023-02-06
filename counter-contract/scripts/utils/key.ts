import {KeyPair, mnemonicToPrivateKey} from "ton-crypto";

export async function getKeyFromEnv():Promise<KeyPair>{
    let mnemonics = process.env.MNEMONIC || "";
    console.log(mnemonics)
    let keyPair = await mnemonicToPrivateKey(mnemonics.split(" "));
    return keyPair
}