// console.log("### main");

import { isRegister, setRegister } from "./isRegister";
import { clickLogin } from "./clickLogin";
import { updateLang } from "./i18n/i18n";
import { changeLang, getStorageLang } from "./i18n/langs";
import { updateHeight } from "./updateHeight";
import setStyleDisplay from "./setStyleDisplay"
import { changeColorScheme, getStorageColorScheme, initColorScheme } from './colorScheme'

initColorScheme()

// 获取footer结尾追加的配置内容
const footerAddTemplate = document.createElement('template')
footerAddTemplate.innerHTML = await (await fetch('./config/footer.html')).text()


async function main() {
  // console.log("Main");

  // 函数用于添加输入框按回车键时的响应
  function add_doc_Enter_listener(doc_name: string, func: string | Function) {
    switch (typeof func) {
      case "function":
        // 运行函数，例如 clickLogin
        var thisfunc = (event: KeyboardEvent) => {
          if (event.key == "Enter") func();
        }
        break;
      case "string":
        // 选中对应名称的元素
        var thisfunc = (event: KeyboardEvent) => {
          if (event.key == "Enter")
            (document.getElementById(func) as HTMLInputElement).focus();
        }
        break;
      default:
        throw new TypeError("Don't input other type to func!");
    }

    (document.getElementById(doc_name) as HTMLInputElement).addEventListener(
      "keyup",
      thisfunc
    );
  }

  // 添加输入框按回车键的响应
  add_doc_Enter_listener("username", "password");
  add_doc_Enter_listener("password", () => {
    if (isRegister()) {
      self.repeat_password.focus();
    } else {
      clickLogin();
    }
  });
  add_doc_Enter_listener("repeat_password", "verification_code");
  add_doc_Enter_listener("verification_code", clickLogin);

  // 添加登录按钮的响应
  self.loginbutton.addEventListener("click", clickLogin);

  // 添加登录与注册模式切换按钮的响应
  self.loginTitleLogin.addEventListener("click", () => setRegister(false));
  self.loginTitleRegister.addEventListener("click", () => setRegister(true));

  // Settings
  self.settingsLanguage.addEventListener("change", () => {
    changeLang(self.settingsLanguage.value)
  })
  self.settingsLanguage.value = getStorageLang()

  self.settingsColorScheme.addEventListener("change", () => {
    changeColorScheme(self.settingsColorScheme.value)
  })
  self.settingsColorScheme.value = getStorageColorScheme()

  self.buttonOpenSettings.addEventListener("click", () => {
    setStyleDisplay(true, self.divDialogSettingsMain)
  })
  self.divDialogSettingsHeaderClose.addEventListener("click", () => {
    setStyleDisplay(false, self.divDialogSettingsMain)
  })
  self.addEventListener("keydown", (e) => {
    if (e.key == 'Escape') {
      if (self.divDialogSettingsMain.style.display == "") {
        setStyleDisplay(false, self.divDialogSettingsMain)
      }
    }
  })

  // footer结尾追加内容
  self.footer.appendChild(
    footerAddTemplate.content.cloneNode(true)
  );

  // resize触发更新高度
  self.addEventListener("resize", updateHeight);

  // 显示
  setStyleDisplay(true, self.divmain)

  // 更新语言
  updateLang();
}

// console.log('document.readyState:', document.readyState)
if (document.readyState == 'loading') {
  // body未加载
  document.addEventListener("DOMContentLoaded", main)
} else {
  // body已加载
  await main();
}
