import { getDefaultLang } from "./i18n/langs";

/** 函数用于更新页面高度 */
export function updateHeight() {
  // console.log('updateHeight');
  // 更新登录按钮那块的高度
  self.divLoginButton.style.height = "";
  self.divLoginButton.style.height =
    (document.getElementsByClassName("loginStatus")[0] as HTMLElement)
      .offsetHeight + "px";

  // 看情况决定隐藏右上角图标
  var main2Max = 0;
  switch (getDefaultLang()) {
    case "zh-CN":
      main2Max = self.isSecureContext ? 0 : 316;
      break;
    default:
      main2Max = self.isSecureContext ? 292 : 375;
  }
  if (self.divmain2.offsetWidth < main2Max + 24) {
    self.titleBox.classList.add("titleBoxImgHide");
  } else {
    self.titleBox.classList.remove("titleBoxImgHide");
  }
}
