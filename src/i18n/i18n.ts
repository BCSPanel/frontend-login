import { updateHeight } from "../updateHeight";
import { getThisLang, langsParams } from "./langs";


/** 函数用于更新显示语言 */
export function updateLang(
    i18n_id?: string,
    statu?: string,
    params?: any,
    ignore_update_property: boolean = false
) {
    console.log('updateLang');
    /** 获取当前语言对象 */
    const thisLang = getThisLang()
    /** 函数用于更新元素显示内容 */
    function updateI18nElement(
        i18n_id: string,
        statu?: string | undefined,
        params?: any | undefined
    ) {
        console.log(`updateI18nElement ${i18n_id}`);

        /** 依据i18n_id获取所有匹配的元素 */
        const eles = document.querySelectorAll(`[i18n_id="${i18n_id}"]`) as NodeListOf<I18nElement>
        // console.log(eles);

        // 如果找不到元素，滚出去
        if (eles.length === 0) return;

        // 获取对应i18n_id的语言文件
        //@ts-ignore
        let property = thisLang[i18n_id]
        // console.log(property);

        // 如果对应语言文件是对象
        if (typeof property === 'object') {
            // 如果已经输入了参数对象
            if (params) {
                // 那么将语言文件的参数合集设置成输入的
                langsParams[i18n_id] = params
            } else {
                // 否则将输入的设置成语言文件的
                params = langsParams[i18n_id]
            }
            // console.log(params);

            // 如果没输入statu
            if (statu === undefined) {
                // 获取第0个元素的statu
                //@ts-ignore
                statu = eles[0].attributes.i18n_statu?.value
            }
            // console.log(statu);

            // 获取当前状态对应的语言字符串
            property = property.status[statu]
            // console.log(property);
            // 如果没找到，直接用statu
            if (!property) {
                property = statu
            } else if (params) for (let i in params) {
                // 否则如果参数合集是对象，遍历替换各个参数名
                // console.log(i)
                property = property.replace(`{{${i}}}`, params[i])
            }
        }
        // 遍历找到的所有元素，让更改生效
        for (const ele of eles) {
            // 如果有状态，修改元素的状态属性
            const ele_i18n_statu = ele.attributes?.i18n_statu
            if (ele_i18n_statu !== undefined) {
                ele_i18n_statu.value = statu as string
            }
            // 如果不忽略更新显示文本，那么更新
            if (!ignore_update_property) {
                const i18n_property_name = ele.attributes.i18n_property_name.value;
                //@ts-ignore
                ele[i18n_property_name] = property;
                // 更新镜像内容
                const mirIds = ele.attributes.i18n_mirror_elementIds?.value?.split(',');
                if (mirIds) for (const i of mirIds) {
                    const mirEle = document.getElementById(i) as I18nElement | null;
                    if (!mirEle) continue;
                    //@ts-ignore
                    mirEle[i18n_property_name] = property;
                }
            }
        }
    }
    // 如果输入了元素id
    if (i18n_id) {
        // 那么仅更新这个元素的语言内容
        updateI18nElement(i18n_id, statu, params)
    } else {
        // 否则遍历更新语言文件里提到的所有i18n_id
        for (let i in thisLang) {
            // 跳过保留名称
            if (i === 'langName') continue;
            // 更新
            updateI18nElement(i, statu, params)
        }
    }
    updateHeight()
}

/** 函数用于通过元素id获取i18n_id */
export function getI18nIdFromElementId(elementId: string): string | undefined {
    const value: string | null | undefined = (document.getElementById(elementId) as (I18nElement | null))?.attributes?.i18n_id?.value;
    if (value) return value;
}

/** 函数用于切换显示登录状态 */
export function changeLoginStats(
    statu: string,
    color: string | undefined = undefined,
    params: any | undefined = undefined
) {
    console.log(`changeLoginStats ${statu}`);
    // 切换文本内容
    updateLang('loginStatus', statu, params)
    // 如果输入了颜色，那么切换颜色
    if (color !== undefined) {
        (document.getElementById('loginStatus') as HTMLElement).style.color = color;
    }
}
