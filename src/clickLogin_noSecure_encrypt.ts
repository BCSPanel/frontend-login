console.log('import clickLogin_noSecure_encrypt');

import isRegister from './isRegister';
import { SHA256 } from './sha256';

// 异步预加载crypto-js
if (isRegister) {
    import('./tripledes_encrypt');
}


interface postLoginBodyType {
    // 安全上下文
    "secure": boolean,
    // 是否处于注册模式
    "isregister": boolean,
    // 用户名
    "username": string,
    // 密码
    "password": string,
    // 盐 登录模式发送随机盐 注册模式发送验证码
    "salt": string,
}

/** 
 * 不安全时加密
 * （加密只防直接读密码，不防篡改注入读密码脚本，不防抓cookie）
 */
export async function updateBody(postLoginBody: postLoginBodyType, login_salt_api: string) {
    console.log('clickLogin_noSecure_encrypt updateBody');
    // 不可逆加密
    postLoginBody.password = await SHA256(postLoginBody.password);
    // 如果是注册
    if (isRegister) {// 是注册
        // 读取验证码
        const verification_code = (document.getElementById("verification_code") as HTMLInputElement).value.trim();
        // 将验证码作为盐，加盐并再次不可逆加密
        postLoginBody.password = await SHA256(postLoginBody.password + verification_code);
        // 验证码与不可逆加密后的密码混合，不可逆加密后再发送（密码解密后符合sha256特征，那么使用这个进行第2步验证）
        postLoginBody.salt = await SHA256(verification_code + postLoginBody.password);
        // 导入crypto-js
        const { encrypt } = (await import('./tripledes_encrypt'));
        // 使用验证码作为密钥，对称加密
        postLoginBody.password = encrypt(postLoginBody.password, verification_code);
    } else {// 是登录
        // 向服务器要盐
        const response = await fetch(login_salt_api.replace('{{username}}', postLoginBody.username));
        if (!response.ok) throw response.status;

        /** ["该用户注册时的验证码", "随机盐"] */
        const someSalt = await response.json();
        // const someSalt = ["114514","1919810"]

        // 加盐并再次不可逆加密
        for (const i of someSalt) {
            postLoginBody.password = await SHA256(postLoginBody.password + i);
        }
        // 发送随机盐
        postLoginBody.salt = someSalt[1];
    }
}
