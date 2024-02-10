// https://stackoverflow.com/questions/46946380/fetch-api-request-timeout/50101022#50101022

/** 为fetch请求添加自定义超时时长，默认秒数读取自 window.fetchTimeoutSeconds */
export default async function (
    input: string | URL | Request,
    init: RequestInit = {},
    timeout_seconds: number = +window.fetchTimeoutSeconds
): Promise<Response> {
    console.log(`myFetch ${timeout_seconds}`);
    const controller = new AbortController();
    init.signal = controller.signal;
    var isTimeoutError = false;
    const Timeout = setTimeout(
        () => {
            isTimeoutError = true;
            controller.abort();
        },
        timeout_seconds * 1000 + 1
    )
    try {
        const response = await fetch(input, init);
        clearTimeout(Timeout);
        return response;
    } catch (e) {
        if (isTimeoutError) {
            console.error(e);
            throw `timeout (>${timeout_seconds}s)`;
        }
        throw e;
    }
}
