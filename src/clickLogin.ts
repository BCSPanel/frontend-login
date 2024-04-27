import { changeLoginStats } from "./i18n/i18n";
import { isRegister } from "./isRegister";
import loginConfig from "./loginConfig";
import asyncSleep from "./asyncSleep";

/** 函数用于启用或禁用登录按钮 */
export function setDisabledLoginButton(a: boolean) {
  window.loginbutton.disabled = a;
}

var abortLogin: (() => void) | null = null;

/** 函数用于触发提交表单 */
export async function clickLogin() {
  // console.log("clickLogin");
  // 如果登录按钮被禁止，退出函数
  if (window.loginbutton.disabled) {
    return;
  }
  var loginAborted: boolean = false;
  var Timeout: NodeJS.Timeout | null = null;
  try {
    // 停止之前运行的函数
    if (abortLogin) {
      abortLogin();
      await asyncSleep(10); //ms
    }
    /** 函数用于没填内容 */
    function not_filled_in(
      elementId: string,
      errorStatu: string = "user_name_or_password_not_filled_in"
    ): boolean {
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
    if (
      window.password.value.length >
      128
    ) {
      changeLoginStats("password_too_long", "red");
      return;
    }

    // 如果是注册模式
    if (isRegister()) {
      // 密码强度不足
      {
        const password = window.password.value;
        if (
          password.length < 12 ||
          !/[a-z]/.test(password) ||
          !/[A-Z]/.test(password) ||
          !/[0-9]/.test(password)
        ) {
          changeLoginStats("password_strength_is_insufficient", "red");
          return;
        }
      }
      // 没填重复密码
      if (not_filled_in("repeat_password")) return;
      // 没填验证码
      if (
        not_filled_in(
          "verification_code",
          "the_verification_code_is_not_entered"
        )
      )
        return;
      // 密码与重复密码不相等
      if (
        window.password.value !==
        window.repeat_password.value
      ) {
        changeLoginStats("do_not_enter_two_different_passwords", "red");
        return;
      }
    }
    // 禁用登录按钮
    setDisabledLoginButton(true);
    // console.log("clickLogin running");
    changeLoginStats("attempting_to_login", "gray");

    const postLoginBody: postLoginBodyType = {
      // boolean 安全上下文
      secure: window.isSecureContext,
      // boolean 是否处于注册模式
      isregister: isRegister(),
      // string 用户名
      username: window.username.value,
      // string 密码
      password: window.password.value,
      // string 注册模式发送验证码
      verification_code: window.verification_code.value,
    };

    // 准备提交
    // console.log("clickLogin POST");
    // console.log(postLoginBody);
    // 如果运行了另一个函数，另一个函数可以终止当前请求
    const controller = new AbortController();
    abortLogin = () => {
      // console.log("abortLogin");
      loginAborted = true;
      controller?.abort();
    };
    // 1.3秒内还没提交完，先允许登录按钮
    Timeout = setTimeout(() => {
      setDisabledLoginButton(false);
    }, 1300);
    // 提交
    const response = await fetch(
      loginConfig.login_api,
      {
        method: "POST",
        body: JSON.stringify(postLoginBody),
        signal: controller.signal,
      },
    );

    // 判断返回
    if (response.ok) {
      // 成功
      changeLoginStats(
        "login_succeeded",
        document.children[0].classList.contains("dark")
          ? "lightgreen"
          : "green"
      );
      setDisabledLoginButton(true);
      loginConfig.login_success_redirect();
    } else if (response.status == 401) {
      // 服务器拒绝
      console.error(401);
      const text = (await response.text()).trim();
      if (text === "") throw 401;
      changeLoginStats(text, "red");
      await asyncSleep(1000);
      setDisabledLoginButton(false);
    } else {
      // 未知状态码
      throw response.status;
    }
  } catch (e) {
    if (loginAborted) return;
    console.error(e);
    changeLoginStats("login_failed", "red", {
      error: String(e),
    });
    setDisabledLoginButton(false);
  } finally {
    if (Timeout != null) clearTimeout(Timeout);
    abortLogin = null;
  }
}

// changeLoginStats("login_failed", "red", {error: "但《原神》是一款由米哈游自主研发的全新开放冒险世界游戏。"})
