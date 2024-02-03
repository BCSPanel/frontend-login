/**
 * 检测是否处于注册页面的状态。
 * 对应的，服务器后端需要对reg参数进行验证，如果与最新的注册码不匹配则返回403
 */
export default !!new URLSearchParams(window.location.search).get('reg')
