console.log('import sha256');

import crypto_sha256 from 'crypto-js/sha256'

export async function SHA256(password: string) {
    return crypto_sha256(password).toString() // 实测返回结果是 小写字母+数字
}
