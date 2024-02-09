console.log('import sha256_auto_webcrypto');

/** 不可逆加密 输出小写字母与数字的十六进制字符串 例如 6aa0b92f3e88becb6cc04f03ac4e142266a29e74feea629b6d2aa97dbb7db03a */
export var SHA256: (password: string) => Promise<string>;

if (window.isSecureContext) {
    // web crypto
    // https://developer.mozilla.org/zh-CN/docs/Web/API/SubtleCrypto/digest
    console.log('sha256 using web crypto');
    SHA256 = async (password: string) => {
        const msgUint8 = new TextEncoder().encode(password); // 编码为（utf-8）Uint8Array
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // 计算消息的哈希值
        const hashArray = Array.from(new Uint8Array(hashBuffer)); // 将缓冲区转换为字节数组
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join(""); // 将字节数组转换为十六进制字符串
        return hashHex; // 实测返回结果是 小写字母+数字
    }
} else {
    // crypto-js
    // https://www.npmjs.com/package/crypto-js
    console.log('sha256 using crypto-js');
    // 异步预加载
    import('crypto-js/sha256');
    // 定义函数
    SHA256 = async (password: string) => {
        const { default: crypto_sha256 } = (await import('crypto-js/sha256'));
        return crypto_sha256(password).toString() // 实测返回结果是 小写字母+数字
    }
}
