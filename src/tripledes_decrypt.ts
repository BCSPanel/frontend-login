console.log('import tripledes_decrypt');

import crypto_TripleDES from 'crypto-js/tripledes'
import crypto_enc_utf8 from 'crypto-js/enc-utf8'

/** 3DES 对称解密 */
export function decrypt(message: string, key: string) {
    return crypto_TripleDES.decrypt(message, key).toString(crypto_enc_utf8) //返回utf-8
}
