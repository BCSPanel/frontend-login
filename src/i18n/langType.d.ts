interface langType {
    langName: string;
    loginTitleLogin: string;
    loginTitleRegister: string;
    form_username: string;
    form_password: string;
    form_repeat_password: string;
    form_verification_code: string;
    loginStatus: {
        status: {
            not_logged_in: string;
            user_name_or_password_not_filled_in: string;
            the_verification_code_is_not_entered: string;
            attempting_to_login: string;
            login_failed: string;
            login_succeeded: string;
            do_not_enter_two_different_passwords: string;
            wrong_username_or_password: string;
            wrong_verification_code: string;
            please_try_again: string;
            password_strength_is_insufficient: string;
            password_too_long: string;
            incorrect_username_format: string;
        };
    };
    forgotPassword: string;
    loginbutton: {
        status: {
            login: string;
            register: string;
        };
    };
    notSecureWarning: string;
}
