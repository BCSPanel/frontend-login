function disable(b: boolean) {
    self.submit.disabled = b
}

function status(s: string, colorClass: string = 'red') {
    if (s.startsWith('@')) {
        self.pStatus.className = s.slice(1) + ' ' + colorClass
        self.pStatus.innerText = ''
    } else {
        self.pStatus.className = 'red'
        self.pStatus.innerText = s
    }
}

let abort: Function | null | void

export async function submit(e: SubmitEvent) {
    console.log('submit');
    e.preventDefault()

    try {
        abort?.()
    } catch (e) {
        console.error(e);
    }

    const isReg = self.inputModeReg.checked
    if (isReg && self.inputPassword.value != self.inputRepeatPassword.value)
        return status('@repeat-password-mistake')

    disable(true)
    setTimeout(() => disable(false), 1000)
    status('@wait-a-moment', 'gray')
    try {
        const submitForm = {
            // boolean 安全上下文
            secure: isSecureContext,
            // boolean 是否处于注册模式
            isregister: isReg,
            // string 用户名
            username: self.inputUserName.value,
            // string 密码
            password: self.inputPassword.value,
            // string 注册模式发送验证码
            verifycode: isReg ? self.inputVerifyCode.value : '',
        };

        // 如果运行了另一个函数，另一个函数可以终止当前请求
        const controller = new AbortController();
        abort = controller.abort;

        const resp = await fetch(
            "../api/login/login",
            {
                method: "POST",
                body: JSON.stringify(submitForm),
                signal: controller.signal,
            },
        );

        if (resp.ok) {
            clearTimeout(undefined)
            status('@welcome', 'green')
            disable(true)
            return location.replace('../')
        }
        if (resp.status == 401) {
            const text = (await resp.text()).trim();
            if (text) return status(text)
        }
        status(resp.status + ' ' + resp.statusText)
    } catch (e) {
        console.error(e);
        status(String(e))
    } finally {
        abort = null
    }
}