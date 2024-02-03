import asyncSleep from './asyncSleep';
import isRegister from './isRegister';
import clickLogin from './clickLogin';
import { setI18nElementStatu, updateLang } from './i18n/i18n';
import { changeLang, langsKeys } from './i18n/langs';
import { updateHeight } from './updateHeight';

// 将加载页面的logo的dataurl缓存备用
; (window as any).appLogoDataUrl = (
  document.getElementById('loading_applogo') as HTMLImageElement
).src

// 函数用于移除加载页面
async function remove_loading() {
  console.log('remove loading')
    ; (document.getElementById('loading_p_failed') as HTMLElement).remove()
    ; (document.getElementById('loading_div2') as HTMLElement).style.opacity = '0'
  await asyncSleep(400)
    ; (document.getElementById('loading_div') as HTMLElement).style.opacity = '0'
  await asyncSleep(300)
    ; (document.getElementById('loading_div') as HTMLElement).remove()
    ; (document.getElementById('loading_style') as HTMLElement).remove()
}

/////////////////////////////////////

// 函数用于添加输入框按回车键时的响应
function add_doc_Enter_listener(doc_name: string, func: string | Function) {
  if (typeof func === 'function') {
    // 运行函数，例如 clickLogin
    var thisfunc = (event: KeyboardEvent) => {
      if (event.key === 'Enter')
        func();
    };
  } else if (typeof func === 'string') {
    // 选中对应名称的元素
    var thisfunc = (event: KeyboardEvent) => {
      if (event.key === 'Enter')
        (document.getElementById(func) as HTMLInputElement).focus();
    };
  } else throw new TypeError("Don't input other type to func!");

  (document.getElementById(doc_name) as HTMLInputElement).addEventListener("keyup", thisfunc);
}

// 添加输入框按回车键的响应
add_doc_Enter_listener("username", "password");
if (isRegister) {
  add_doc_Enter_listener("password", "repeat_password");
  add_doc_Enter_listener("repeat_password", clickLogin);
} else {
  add_doc_Enter_listener("password", clickLogin);
}

// 添加登录按钮的响应
(document.getElementById("loginbutton") as HTMLButtonElement).addEventListener('click', clickLogin);

/* 函数用于添加语言切换按钮的响应 */
function clickChangeLang(event: MouseEvent) {
  // 隐藏菜单
  const contentStyle = (document.getElementById('div_change_lang_content') as HTMLElement).style;
  contentStyle.display = 'none';
  // 依据元素id切换对应语言
  changeLang(
    (event.target as HTMLElement).id.replace('changeLang_', '')
  );
  // 异步显示菜单
  setTimeout(() => {
    contentStyle.display = '';
  }, 0)
}
// 遍历添加语言切换按钮的响应
for (const i of langsKeys.concat('default')) {
  (document.getElementById('changeLang_' + i) as HTMLElement).addEventListener('click', clickChangeLang);
}

// HTTP不安全警告
if (!window.isSecureContext) {
  (document.getElementById("notSecureWarning") as HTMLElement).style.display = '';
}

// 配置注册页
if (isRegister) {
  (document.getElementById('repeat_password') as HTMLElement).style.display = '';
  setI18nElementStatu('loginTitle', 'register');
  setI18nElementStatu('loginbutton', 'register');
}

// footer结尾追加内容
document.getElementsByTagName("footer")[0].appendChild(
  (document.getElementById('footer_template') as HTMLTemplateElement).content.cloneNode(true)
);

// resize触发更新高度
window.addEventListener('resize', updateHeight)

// 更新语言
updateLang()

// 移除加载页面
remove_loading()
