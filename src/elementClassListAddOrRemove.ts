export default function ElementClassListAddOrRemove(element: Element, isAdd: boolean, name: string) {
    if (isAdd) element.classList.add(name);
    else element.classList.remove(name);
}
