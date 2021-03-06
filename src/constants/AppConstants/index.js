const AppConstant = {
    FIRST_NAME_REGX: /^([a-zA-z\s]{2,30})$/,
    PHONE_NUMBER_REGX: /^[0-9]{7}|[0-9]{13}$/,
    EMAIL_REGX: /^[^<>()[\]\\,;:\%#^\s@\"$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/,
    FULL_NAME_REGEX: /^[a-zA-Z][a-zA-Z\s]*$/,
    NUMBER_REGEX: /^[0-9]+$/,
    ALPHANUMERIC_REGEX: /^[ a-zA-Z0-9]{7,16}$/,
    // PASSWORD_REGEX: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
    PASSWORD_REGEX: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    ZIP_CODE_REGX: /^[0-9\b]+$/,
    URL_REGEX: /(((www\.))[^\s]+)/g,
    ANDROID: 'android',
    IOS: 'ios',
    localeEn: 'en',
    localeAr: 'ar',
    enter_phone_number: "Please enter valid phone number.",
    enter_email: "Please enter valid email",
    enter_password: "Please enter valid password",
    network_error_message: "Network Connection not established",
    network_error: "Network Error",
    something_went_wrong_message: "something went wrong",
    retry: "Retry",
    close: "Close",
    ok: "OK",
    ERROR: `Error!`,
    Hypr: 'Hypr',
    Please_enter_description: `Description field cannot be empty.`,
    oneCapitalRegex: /(?=.*[A-Z])/,
    oneNumberRegex: /(?=.*\d)/,
    BaseUrl: "http://beta.hyprweb.com/",
    PrivacyUrl: "privacypolicy",
    TermsAndCondition: "termscondition",

}

export default AppConstant;