console.log('import tripledes_encrypt');

import crypto_TripleDES from 'crypto-js/tripledes'

/** 3DES 对称加密 */
export function encrypt(message: string, key: string) {
    return crypto_TripleDES.encrypt(message, key).toString()
}
