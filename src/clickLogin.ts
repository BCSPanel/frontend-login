import { changeLoginStats } from "./i18n/i18n";
import isRegister from "./isRegister";

// 函数用于启用或禁用登录按钮
export function setDisabledLoginButton(a: boolean) {
    (document.getElementById("loginbutton") as HTMLButtonElement).disabled = a;
}

// 函数用于触发提交表单
export default async () => {
    try {
        console.log("clickLogin");
        if ((document.getElementById("loginbutton") as HTMLButtonElement).disabled)
            return;
        if ((document.getElementById("username") as HTMLInputElement).value === "") {
            changeLoginStats("user_name_or_password_not_filled_in", "red");
            (document.getElementById("username") as HTMLInputElement).focus();
            return;
        }
        if ((document.getElementById("password") as HTMLInputElement).value === "") {
            changeLoginStats("user_name_or_password_not_filled_in", "red");
            (document.getElementById("password") as HTMLInputElement).focus();
            return;
        }
        if (isRegister) {
            if ((document.getElementById("repeat_password") as HTMLInputElement).value === "") {
                changeLoginStats("user_name_or_password_not_filled_in", "red");
                return;
            }
            if (
                (document.getElementById("password") as HTMLInputElement).value !==
                (document.getElementById("repeat_password") as HTMLInputElement).value
            ) {
                changeLoginStats("do_not_enter_two_different_passwords", "red");
                return;
            }
        }
        console.log("clickLogin running");

        setDisabledLoginButton(true);

        /** form data search */
        const FDS = new URLSearchParams()
        FDS.append("username", (document.getElementById("username") as HTMLInputElement).value)
        FDS.append("password", (document.getElementById("password") as HTMLInputElement).value)

        const response = await fetch('../api/login', {
            method: "POST",
            body: FDS,
        })

        if (response.status == 200) {
            changeLoginStats('login_succeeded', 'green');
            location.pathname = '../web/';
        } else if (response.status == 403) {
            changeLoginStats('wrong_username_or_password', 'red');
            setDisabledLoginButton(false)
        } else {
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
