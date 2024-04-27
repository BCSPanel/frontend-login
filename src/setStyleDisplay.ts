export default function setStyleDisplay(enable: boolean, ...elements: HTMLElement[]) {
    for (const i of elements) {
        i.style.display = enable ? '' : 'none'
    }
}