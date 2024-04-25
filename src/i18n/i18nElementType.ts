/** 自定义元素类型，基于原版添加了一些参数 */
interface I18nElementAttributes extends NamedNodeMap {
    i18n_id: Attr // loginTitle
    i18n_statu: Attr | undefined // login
    i18n_property_name: Attr // innerText
    i18n_mirror_elementIds: Attr | undefined // title,title2,title3
}
interface I18nElement extends HTMLElement {
    attributes: I18nElementAttributes
}
