import { updateLang } from "./i18n/i18n";

var isReg = false

export function isRegister() {
    return isReg
}

export function setRegister(enable: boolean) {
    if (isReg === enable) return;
    isReg = enable
    if (enable) {
        self.repeat_password.style.display = '';
        self.verification_code.style.display = '';
        updateLang('loginbutton', 'register', undefined, false);
        self.loginTitleLogin.classList.remove("loginTitleSelect");
        self.loginTitleRegister.classList.add("loginTitleSelect");
        self.password.classList.remove("inputLastChild");
    } else {
        self.repeat_password.style.display = 'none';
        self.verification_code.style.display = 'none';
        updateLang('loginbutton', 'login', undefined, false);
        self.loginTitleLogin.classList.add("loginTitleSelect");
        self.loginTitleRegister.classList.remove("loginTitleSelect");
        self.password.classList.add("inputLastChild");
    }
}
