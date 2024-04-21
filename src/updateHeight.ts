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

  // // 隐藏菜单
  // const langsContentStyle = (
  //   document.getElementById("div_change_lang_content") as HTMLElement
  // ).style;
  // langsContentStyle.display = "none";
  // // 更新主体框高度
  // const divmain = document.getElementById("divmain") as HTMLDivElement; // 取元素的，可能非必要，但能让ts看懂
  const divmain2 = document.getElementById("divmain2") as HTMLDivElement;
  // divmain.style.bottom = ""; // 取消上下居中
  // divmain.style.height = ""; // 取消高度设定
  // divmain.style.height = divmain2.offsetHeight + "px"; // 设定高度
  // if (window.innerHeight > divmain.offsetHeight) {
  //   divmain.style.bottom = "0"; // 上下居中
  // }
  // document.body.style.minHeight = divmain.offsetHeight + "px";

  // 看情况决定隐藏右上角图标
  const titleImg = document.getElementById("titleImg") as HTMLImageElement;
  // const titleBoxRight = (document.getElementById('titleBoxRight') as HTMLDivElement);
  // const div_change_lang_content = (document.getElementById('div_change_lang_content') as HTMLDivElement);
  const titleBox = document.getElementById("titleBox") as HTMLImageElement;
  var main2Max = 0;
  switch (getDefaultLang()) {
    case "zh-CN":
      main2Max = window.isSecureContext ? 0 : 316;
      break;
    default:
      main2Max = window.isSecureContext ? 292 : 375;
  }
  var setImgSrc = "icon/BCSPanel.png";
  if (divmain2.offsetWidth < main2Max + 24) {
    setImgSrc = "icon/BCSP-64x64.png";
    titleBox.classList.add("titleBoxImgHide");
  } else {
    titleBox.classList.remove("titleBoxImgHide");
  }
  if (!titleImg.src.endsWith(setImgSrc)) titleImg.src = setImgSrc;

  // // 显示菜单
  // langsContentStyle.display = "";
}
