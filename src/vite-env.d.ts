/// <reference types="vite/client" />

declare interface Window {
  fetchTimeoutSeconds?: number
  createMain?: (() => void)
  bodyLoadedScript?: HTMLScriptElement
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
