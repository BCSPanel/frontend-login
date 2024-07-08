import ElementClassListAddOrRemove from "./elementClassListAddOrRemove";
import { updateLang } from "./i18n/i18n";
import setStyleDisplay from "./setStyleDisplay";


var isReg = false

export function isRegister() {
    return isReg
}

export function setRegister(enable: boolean) {
    if (isReg == enable) return;
    isReg = enable

    setStyleDisplay(enable, self.repeat_password, self.verification_code)
    setStyleDisplay(enable, self.divSettingsAllowWeakPassword)

    updateLang('loginbutton', enable ? 'register' : 'login', undefined, false);

    const loginTitleSelect = "loginTitleSelect"
    ElementClassListAddOrRemove(self.loginTitleLogin, !enable, loginTitleSelect)
    ElementClassListAddOrRemove(self.loginTitleRegister, enable, loginTitleSelect)
    ElementClassListAddOrRemove(self.password, !enable, "inputLastChild")
}
