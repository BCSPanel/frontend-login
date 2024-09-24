import { submit } from "./submit";

function init() {
    self.html.lang = navigator.language;

    if (self.supportES2023) self.unsupportedES2023?.remove();

    (self.formLoginMode.onchange = () => {
        if (self.inputModeLogin.checked) {
            self.html.classList.add('login')
            self.inputPassword.autocomplete = "current-password"
            self.inputRepeatPassword.required =
                self.inputVerifyCode.required = false
        } else {
            self.html.classList.remove('login')
            self.inputPassword.autocomplete = "new-password"
            self.inputRepeatPassword.required =
                self.inputVerifyCode.required = true
        }
    })()

    self.formLogin.onsubmit = submit

    self.loading?.remove()

    self.inputUserName.focus()
}

document.readyState != "loading" ? init() : document.addEventListener("DOMContentLoaded", init)
