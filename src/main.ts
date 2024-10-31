import { submit } from "./submit";

function init() {
    document.lastChild.lang = navigator.language;

    if (self.supportES2023) self.unsupportedES2023?.remove();

    self.formLogin.onsubmit = submit

    self.loading?.remove()

    self.inputUserName.focus()
}

document.readyState != "loading" ? init() : document.addEventListener("DOMContentLoaded", init)
