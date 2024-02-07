import { changeLoginStats } from "./i18n/i18n";
import isRegister from "./isRegister";


export const loginConfig = {
    login_api: '../api-login/',
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
        function not_filled_in(elementId: string): boolean {
            const element = document.getElementById(elementId) as HTMLInputElement;
            if (element.value !== "") return false;
            changeLoginStats("user_name_or_password_not_filled_in", "red");
            element.focus();
            return true;
        }
        // 没填用户名
        if (not_filled_in("username")) return;
        // 没填密码
        if (not_filled_in("password")) return;
        // 如果是注册模式
        if (isRegister) {
            // 没填重复密码
            if (not_filled_in("repeat_password")) return;
            // 没填验证码
            if (not_filled_in("verification_code")) return;
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

        // 禁用登录按钮
        setDisabledLoginButton(true);

        /** form data search */
        const FDS = new URLSearchParams();
        function FDS_append(elementId: string) {
            FDS.append(elementId, (document.getElementById(elementId) as HTMLInputElement).value);
        }
        FDS_append("username");
        FDS_append("password");
        if (isRegister) {
            FDS_append("verification_code");
        }

        // 提交
        const response = await fetch(loginConfig.login_api, {
            method: "POST",
            body: FDS,
        })

        // 判断返回
        if (response.status == 200) {
            // 成功
            changeLoginStats('login_succeeded', 'green');
            loginConfig.login_success_redirect();
        } else if (response.status == 403) {
            // 用户名或密码错误
            changeLoginStats('wrong_username_or_password', 'red');
            setDisabledLoginButton(false)
        } else {
            // 未知状态码
            changeLoginStats('login_failed', 'red', {
                error: String(response.status)
            });
            setDisabledLoginButton(false)
        }
    } catch (e) {
        console.log(e)
        changeLoginStats("login_failed", "red", {
            error: String(e)
        })
    }
}

// changeLoginStats("login_failed", "red", {error: "但《原神》是一款由米哈游自主研发的全新开放冒险世界游戏。"})
