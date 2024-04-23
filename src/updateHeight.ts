import { getDefaultLang } from "./i18n/langs";

/** 函数用于更新页面高度 */
export function updateHeight() {
  // console.log('updateHeight');
  // 更新登录按钮那块的高度
  const divLoginButton = document.getElementById(
    "divLoginButton"
  ) as HTMLElement;
  divLoginButton.style.height = "";
  divLoginButton.style.height =
    (document.getElementsByClassName("loginStatus")[0] as HTMLElement)
      .offsetHeight + "px";

  // 看情况决定隐藏右上角图标
  const divmain2 = document.getElementById("divmain2") as HTMLDivElement;
  const titleBox = document.getElementById("titleBox") as HTMLImageElement;
  var main2Max = 0;
  switch (getDefaultLang()) {
    case "zh-CN":
      main2Max = window.isSecureContext ? 0 : 316;
      break;
    default:
      main2Max = window.isSecureContext ? 292 : 375;
  }
  if (divmain2.offsetWidth < main2Max + 24) {
    titleBox.classList.add("titleBoxImgHide");
  } else {
    titleBox.classList.remove("titleBoxImgHide");
  }
}
