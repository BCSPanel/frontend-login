import { updateLang } from "./i18n";
import lang_en from "./lang/en.json";
import lang_zh_CN from "./lang/zh-CN.json";

/** 将语言文件全部汇集成一个对象 */
export const langs = {
  en: lang_en as langType,
  "zh-CN": lang_zh_CN as langType,
};
/** Object.keys(langs) */
export const langsKeys = Object.keys(langs);

/** 语言参数 */
export const langsParams: any = {
  /* "loginStatus": {
        "error": "404"
    } */
};

// 当前语言
var defaultLang: string;

const storageCacheName = "BCSPanelI18nLangName";

/** 函数用于切换语言 */
export function changeLang(
  langName?: string | undefined | null,
  ignoreUpdate: boolean = false
) {
  // console.log(`changeLang ${langName}`);
  // 如果没输入语言名称，那就读缓存
  if (typeof langName !== "string") {
    langName = localStorage.getItem(storageCacheName);
  }
  // 如果语言名称存在且不是“默认”
  if (langName && langName !== "default") {
    // 如果找到了那么选中对应名称，否则选中en
    defaultLang = Object.keys(langs).includes(langName) ? langName : "en";
    // 写入缓存
    localStorage.setItem(storageCacheName, defaultLang);
    // 更新并退出
    if (!ignoreUpdate) updateLang();
    return;
  }
  // 移除缓存
  localStorage.removeItem(storageCacheName);
  // 从浏览器语言列表里查找支持的语言
  for (let i of navigator.languages) {
    if (i === "zh-Hans-CN") i = "zh-CN"; // Firefox Android
    if (langsKeys.includes(i)) {
      // 找到了，选中
      defaultLang = i;
      // 更新并退出
      if (!ignoreUpdate) updateLang();
      return;
    }
  }
  // 找不到，默认en
  defaultLang = "en";
  // 更新
  if (!ignoreUpdate) updateLang();
}

// 立即生效，但忽略更新
changeLang(null, true);

/** 获取当前语言 */
export function getDefaultLang() {
  return defaultLang;
}

/** 依据当前语言获取内容 */
export function getThisLang(): langType {
  //@ts-ignore
  return langs[defaultLang];
}
