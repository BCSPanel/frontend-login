import { updateLang } from "./i18n/i18n";

var isReg = false

export function isRegister() {
    return isReg
}

export function setRegister(enable: boolean) {
    isReg = enable
    if (enable) {
        (document.getElementById('repeat_password') as HTMLElement).style.display = '';
        (document.getElementById('verification_code') as HTMLElement).style.display = '';
        updateLang('loginbutton', 'register', undefined, false);
        (document.getElementById("loginTitleLogin") as HTMLSpanElement).classList.remove("loginTitleSelect");
        (document.getElementById("loginTitleRegister") as HTMLSpanElement).classList.add("loginTitleSelect");
        (document.getElementById("password") as HTMLSpanElement).classList.remove("inputLastChild");
    } else {
        (document.getElementById('repeat_password') as HTMLElement).style.display = 'none';
        (document.getElementById('verification_code') as HTMLElement).style.display = 'none';
        updateLang('loginbutton', 'login', undefined, false);
        (document.getElementById("loginTitleLogin") as HTMLSpanElement).classList.add("loginTitleSelect");
        (document.getElementById("loginTitleRegister") as HTMLSpanElement).classList.remove("loginTitleSelect");
        (document.getElementById("password") as HTMLSpanElement).classList.add("inputLastChild");
    }
}
