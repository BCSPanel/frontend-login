declare interface Window {
    supportES2023: boolean

    loading?: HTMLDivElement
    root: HTMLDivElement

    imgBCSPanel: HTMLImageElement
    unsupportedES2023: HTMLParagraphElement

    formLoginMode: HTMLDivElement
    inputModeLogin: HTMLInputElement
    inputModeReg: HTMLInputElement

    formLogin: HTMLDivElement
    inputUserName: HTMLInputElement
    inputPassword: HTMLInputElement
    inputRepeatPassword: HTMLInputElement
    inputVerifyCode: HTMLInputElement
    pStatus: HTMLParagraphElement
    submit: HTMLButtonElement
}