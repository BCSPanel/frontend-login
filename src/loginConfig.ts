export default {
    login_api: '../api-login/login',
    login_salt_api(username: string) {
        return `../api-login/salt?username=${username}`
    },
    login_success_redirect() {
        document.location.assign('../web/')
    },
}
