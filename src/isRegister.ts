import { updateLang } from "./i18n/i18n";

var isReg = false

export function isRegister() {
    return isReg
}

export function setRegister(enable: boolean) {
    if (isReg === enable) return;
    isReg = enable
    if (enable) {
        window.repeat_password.style.display = '';
        window.verification_code.style.display = '';
        updateLang('loginbutton', 'register', undefined, false);
        window.loginTitleLogin.classList.remove("loginTitleSelect");
        window.loginTitleRegister.classList.add("loginTitleSelect");
        window.password.classList.remove("inputLastChild");
    } else {
        window.repeat_password.style.display = 'none';
        window.verification_code.style.display = 'none';
        updateLang('loginbutton', 'login', undefined, false);
        window.loginTitleLogin.classList.add("loginTitleSelect");
        window.loginTitleRegister.classList.remove("loginTitleSelect");
        window.password.classList.add("inputLastChild");
    }
}
