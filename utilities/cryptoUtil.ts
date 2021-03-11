import {Logger, Exception} from '../index';
import {AES,enc,mode,pad} from 'crypto-js';

export module CryptoUtil  {

    export function encrypt(password: string, secretKey: string): Promise<string> {
        let encryptedText = new Promise<string>(async (resolve,reject)=> {
            try{
                let encryptedText = AES.encrypt(enc.Utf8.parse(password),secretKey,{
                    iv : "iv",
                    mode : mode.CBC,
                    padding : pad.Pkcs7

                }).toString();
                resolve(encryptedText)
            } catch(error){
                reject(`Error while encrypting the password`)
                Logger.error('Error while encrypting the password')
            }
         });
         return encryptedText;
    }

    export function decrypt(cipherText: string, secretKey: string){
        let decryptedText = new Promise<string>(async (resolve,reject)=> {
            try{
                let encryptedText = AES.decrypt(cipherText.toString(),secretKey.toString(),{
                    iv : "iv",
                    mode : mode.CBC,
                    padding : pad.Pkcs7

                }).toString();
                resolve(encryptedText.toString(enc.Utf8))
            } catch(error){
              reject(`Error while decrypting the password`)
              Logger.error('Error while decrypting the password')
            }
         });
         return decryptedText;
    }


}