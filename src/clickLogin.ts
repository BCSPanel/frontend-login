import { changeLoginStats } from "./i18n/i18n";
import isRegister from "./isRegister";
import fetchWithTimeout from "./fetchWithTimeout";


// 异步预加载 clickLogin_noSecure_encrypt
if (!window.isSecureContext) {
    import('./clickLogin_noSecure_encrypt');
}


export const loginConfig = {
    login_api: '../api-login/login',
    login_salt_api: '../api-login/salt?username={{username}}',
    login_success_redirect: () => {
        location.pathname = '../web/'
    },
}


/** 函数用于启用或禁用登录按钮 */
export function setDisabledLoginButton(a: boolean) {
    (document.getElementById("loginbutton") as HTMLButtonElement).disabled = a;
}

/** 函数用于触发提交表单 */
export async function clickLogin() {
    try {
        console.log("clickLogin");
        // 如果登录按钮被禁止，退出函数
        if ((document.getElementById("loginbutton") as HTMLButtonElement).disabled)
            return;
        /** 函数用于没填内容 */
        function not_filled_in(elementId: string, errorStatu: string = "user_name_or_password_not_filled_in"): boolean {
            const element = document.getElementById(elementId) as HTMLInputElement;
            if (element.value !== "") return false;
            changeLoginStats(errorStatu, "red");
            element.focus();
            return true;
        }
        // 没填用户名
        if (not_filled_in("username")) return;
        // 没填密码
        if (not_filled_in("password")) return;

        // 如果是注册模式
        if (isRegister) {
            // 密码强度不足
            {
                const password = (document.getElementById("password") as HTMLButtonElement).value;
                if (password.length < 12 ||
                    !/[a-z]/.test(password) ||
                    !/[A-Z]/.test(password) ||
                    !/[0-9]/.test(password)
                ) {
                    changeLoginStats('password_strength_is_insufficient', 'red');
                    return;
                }
            }
            // 没填重复密码
            if (not_filled_in("repeat_password")) return;
            // 没填验证码
            if (not_filled_in("verification_code", "the_verification_code_is_not_entered")) return;
            // 密码与重复密码不相等
            if (
                (document.getElementById("password") as HTMLInputElement).value !==
                (document.getElementById("repeat_password") as HTMLInputElement).value
            ) {
                changeLoginStats("do_not_enter_two_different_passwords", "red");
                return;
            }
        }
        console.log("clickLogin running");
        changeLoginStats('attempting_to_login', 'gray');

        // 禁用登录按钮
        setDisabledLoginButton(true);

        const postLoginBody: postLoginBodyType = {
            // boolean 安全上下文
            "secure": window.isSecureContext,
            // boolean 是否处于注册模式
            "isregister": isRegister,
            // string 用户名
            "username": (document.getElementById("username") as HTMLInputElement).value,
            // string 密码
            "password": (document.getElementById("password") as HTMLInputElement).value,
            // string 盐 登录模式发送随机盐 注册模式发送验证码
            "salt": '',
        }
        // 如果不安全
        if (!window.isSecureContext) {
            // 加密
            await (await import('./clickLogin_noSecure_encrypt')).updateBody(postLoginBody, loginConfig.login_salt_api)
        } else if (isRegister) {// 安全的情况下注册
            // 将验证码作为盐，直接发送
            postLoginBody.salt = (document.getElementById("verification_code") as HTMLInputElement).value.trim();
        }

        // 提交
        console.log('clickLogin POST');
        console.log(postLoginBody);
        const response = await fetchWithTimeout(loginConfig.login_api, {
            method: "POST",
            body: JSON.stringify(postLoginBody),
        })

        // 判断返回
        if (response.ok) {
            // 成功
            changeLoginStats('login_succeeded', 'green');
            loginConfig.login_success_redirect();
        } else if (response.status == 403) {
            // 服务器拒绝
            console.error(403);
            const text = (await response.text()).trim();
            if (text === '') throw 403;
            changeLoginStats(text, 'red');
            setDisabledLoginButton(false)
        } else {
            // 未知状态码
            throw response.status;
        }
    } catch (e) {
        console.error(e)
        changeLoginStats("login_failed", "red", {
            error: String(e)
        })
        setDisabledLoginButton(false)
    }
}

// changeLoginStats("login_failed", "red", {error: "但《原神》是一款由米哈游自主研发的全新开放冒险世界游戏。"})
