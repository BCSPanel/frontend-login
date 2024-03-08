import { changeLoginStats } from "./i18n/i18n";
import isRegister from "./isRegister";
import fetchWithTimeout from "./fetchWithTimeout";
import loginConfig from "./loginConfig";
import asyncSleep from "./asyncSleep";


// 异步预加载 clickLogin_noSecure_encrypt
if (!window.isSecureContext) {
    import('./clickLogin_noSecure_encrypt');
}


/** 函数用于启用或禁用登录按钮 */
export function setDisabledLoginButton(a: boolean) {
    (document.getElementById("loginbutton") as HTMLButtonElement).disabled = a;
}


var abortLogin: (() => void) | null = null;

/** 函数用于触发提交表单 */
export async function clickLogin() {
    console.log("clickLogin");
    // 如果登录按钮被禁止，退出函数
    if ((document.getElementById("loginbutton") as HTMLButtonElement).disabled) {
        return
    }
    var loginAborted: boolean = false;
    var Timeout: NodeJS.Timeout | null = null;
    try {
        // 停止之前运行的函数
        if (abortLogin) {
            abortLogin();
            await asyncSleep(10) //ms
        }
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
        // 密码超过128个字符
        if ((document.getElementById("password") as HTMLButtonElement).value.length > 128) {
            changeLoginStats('password_too_long', 'red');
            return;
        }

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
        // 禁用登录按钮
        setDisabledLoginButton(true);
        console.log("clickLogin running");
        changeLoginStats('attempting_to_login', 'gray');

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
            // string cookie存储路径
            // "/web-login/index.html" -> "/"
            // "/bcspanel/web-login/"  -> "/bcspanel/"
            "path": document.location.pathname.replace(/\/web-login\/[^\/]*$/, "/")
        }
        // 如果不安全
        if (!window.isSecureContext) {
            // 加密
            await (await import('./clickLogin_noSecure_encrypt')).updateBody(postLoginBody)
        } else if (isRegister) {// 安全的情况下注册
            // 将验证码作为盐，直接发送
            postLoginBody.salt = (document.getElementById("verification_code") as HTMLInputElement).value.trim();
        }

        // 准备提交
        console.log('clickLogin POST');
        console.log(postLoginBody);
        // 如果运行了另一个函数，另一个函数可以终止当前请求
        const controller = new AbortController();
        abortLogin = () => {
            console.log('abortLogin');
            loginAborted = true;
            controller?.abort();
        }
        // 2秒内还没提交完，先允许登录按钮
        Timeout = setTimeout(() => {
            setDisabledLoginButton(false);
        }, 1500);
        // 提交
        const response = await fetchWithTimeout(loginConfig.login_api, {
            method: "POST",
            body: JSON.stringify(postLoginBody),
        }, undefined, controller);

        // 判断返回
        if (response.ok) {
            // 成功
            changeLoginStats('login_succeeded', 'green');
            loginConfig.login_success_redirect();
        } else if (response.status == 401) {
            // 服务器拒绝
            console.error(401);
            const text = (await response.text()).trim();
            if (text === '') throw 401;
            changeLoginStats(text, 'red');
            await asyncSleep(1500);
            setDisabledLoginButton(false)
        } else {
            // 未知状态码
            throw response.status;
        }
    } catch (e) {
        if (loginAborted) return;
        console.error(e);
        changeLoginStats("login_failed", "red", {
            error: String(e)
        });
        setDisabledLoginButton(false);
    } finally {
        if (Timeout != null) clearTimeout(Timeout);
        abortLogin = null;
    }
}

// changeLoginStats("login_failed", "red", {error: "但《原神》是一款由米哈游自主研发的全新开放冒险世界游戏。"})
