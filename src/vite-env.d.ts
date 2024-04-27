/// <reference types="vite/client" />

declare interface Window {
  fetchTimeoutSeconds?: number

  loading_style?: HTMLStyleElement

  divmain: HTMLDivElement
  divmain2: HTMLDivElement
  divLoginButton: HTMLDivElement
  titleBox: HTMLDivElement

  loginTitleLogin: HTMLButtonElement
  loginTitleRegister: HTMLButtonElement
  loginbutton: HTMLButtonElement

  loginStatus: HTMLSpanElement

  notSecureWarning: HTMLAnchorElement

  username: HTMLInputElement
  password: HTMLInputElement
  repeat_password: HTMLInputElement
  verification_code: HTMLInputElement

  footer: HTMLElement
}

interface postLoginBodyType {
  // 安全上下文
  secure: boolean;
  // 是否处于注册模式
  isregister: boolean;
  // 用户名
  username: string;
  // 密码
  password: string;
  // 注册模式发送验证码
  verification_code: string;
}
