console.log("### main");

import { isRegister, setRegister } from "./isRegister";
import { clickLogin } from "./clickLogin";
import { updateLang } from "./i18n/i18n";
import { changeLang, langsKeys } from "./i18n/langs";
import { updateHeight } from "./updateHeight";

let ranMain = false;

function main() {
  console.log("Main");
  if (ranMain) return;

  // 深色模式
  const matchMediaDark = window.matchMedia("(prefers-color-scheme: dark)");
  function matchMediaDarkChange() {
    let dark = false;
    if (window.BCSPanelColorScheme) {
      dark = window.BCSPanelColorScheme == "dark";
    } else {
      dark = matchMediaDark.matches;
    }
    const htmlclass = document.getElementsByTagName("html")[0].classList;
    if (dark) htmlclass.add("dark");
    else htmlclass.remove("dark");
  }
  window.matchMediaDarkChange = matchMediaDarkChange;
  matchMediaDark.addEventListener("change", matchMediaDarkChange);
  matchMediaDarkChange();

  // 移除加载时的style
  document.getElementById("loading_style")?.remove();

  // 函数用于添加输入框按回车键时的响应
  function add_doc_Enter_listener(doc_name: string, func: string | Function) {
    if (typeof func === "function") {
      // 运行函数，例如 clickLogin
      var thisfunc = (event: KeyboardEvent) => {
        if (event.key === "Enter") func();
      };
    } else if (typeof func === "string") {
      // 选中对应名称的元素
      var thisfunc = (event: KeyboardEvent) => {
        if (event.key === "Enter")
          (document.getElementById(func) as HTMLInputElement).focus();
      };
    } else throw new TypeError("Don't input other type to func!");

    (document.getElementById(doc_name) as HTMLInputElement).addEventListener(
      "keyup",
      thisfunc
    );
  }
  // 添加输入框按回车键的响应
  add_doc_Enter_listener("username", "password");
  add_doc_Enter_listener("password", () => {
    if (isRegister()) {
      (document.getElementById("repeat_password") as HTMLInputElement).focus();
    } else {
      clickLogin();
    }
  });
  add_doc_Enter_listener("repeat_password", "verification_code");
  add_doc_Enter_listener("verification_code", clickLogin);

  // 添加登录按钮的响应
  (
    document.getElementById("loginbutton") as HTMLButtonElement
  ).addEventListener("click", clickLogin);

  // 添加登录与注册模式切换按钮的响应
  (
    document.getElementById("loginTitleLogin") as HTMLSpanElement
  ).addEventListener("click", () => setRegister(false));
  (
    document.getElementById("loginTitleRegister") as HTMLSpanElement
  ).addEventListener("click", () => setRegister(true));

  /* 函数用于添加语言切换按钮的响应 */
  function clickChangeLang(event: MouseEvent) {
    // 依据元素id切换对应语言
    changeLang((event.target as HTMLElement).id.replace("changeLang_", ""));
  }
  // 遍历添加语言切换按钮的响应
  for (const i of langsKeys.concat("default")) {
    document
      .getElementById("changeLang_" + i)
      ?.addEventListener("click", clickChangeLang);
  }

  // HTTP不安全
  if (!window.isSecureContext) {
    // 显示警告
    (document.getElementById("notSecureWarning") as HTMLElement).style.display =
      "";
  }

  // footer结尾追加内容
  document
    .getElementsByTagName("footer")[0]
    .appendChild(
      (
        document.getElementById("template_footer") as HTMLTemplateElement
      ).content.cloneNode(true)
    );

  // resize触发更新高度
  window.addEventListener("resize", updateHeight);

  // 显示
  (document.getElementById("divmain") as HTMLElement).style.display = "";

  // 更新语言
  updateLang();

  ranMain = true;
}

if (document.getElementById("htmlloaded")) {
  main();
  // 加载完成后再次更新高，修复部分情况出现的高度错误
  window.addEventListener("load", updateHeight);
} else {
  window.addEventListener("load", main);
}
