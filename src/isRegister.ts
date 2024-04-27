import ElementClassListAddOrRemove from "./elementClassListAddOrRemove";
import { updateLang } from "./i18n/i18n";


var isReg = false

export function isRegister() {
    return isReg
}

export function setRegister(enable: boolean) {
    if (isReg === enable) return;
    isReg = enable

    self.repeat_password.style.display =
        self.verification_code.style.display =
        enable ? '' : 'none';

    updateLang('loginbutton', enable ? 'register' : 'login', undefined, false);

    const loginTitleSelect = "loginTitleSelect"
    ElementClassListAddOrRemove(self.loginTitleLogin, !enable, loginTitleSelect)
    ElementClassListAddOrRemove(self.loginTitleRegister, enable, loginTitleSelect)
    ElementClassListAddOrRemove(self.password, !enable, "inputLastChild")
}
