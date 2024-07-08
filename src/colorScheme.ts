import ElementClassListAddOrRemove from "./elementClassListAddOrRemove";

const storageName = "BCSPanelColorScheme"
const matchMediaDark = self.matchMedia("(prefers-color-scheme: dark)");

function matchMediaDarkChange() {
    const BCSPanelColorScheme = localStorage.getItem(storageName)
    ElementClassListAddOrRemove(
        document.children[0],
        BCSPanelColorScheme ? BCSPanelColorScheme == "dark" : matchMediaDark.matches,
        "dark"
    )
}

export function initColorScheme() {
    matchMediaDarkChange();
    matchMediaDark.addEventListener("change", matchMediaDarkChange);
    const style = document.createElement("style")
    style.innerHTML = "*{transition:var(--transition)}"
    setTimeout(() => document.head.appendChild(style), 200)
}

export function changeColorScheme(name: string | undefined) {
    if (name) {
        localStorage.setItem(storageName, name)
    } else {
        localStorage.removeItem(storageName)
    }
    matchMediaDarkChange()
}

export function getStorageColorScheme() {
    return localStorage.getItem(storageName) || ""
}