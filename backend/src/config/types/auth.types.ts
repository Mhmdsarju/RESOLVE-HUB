export const AUTH_TYPES = {
    //usecase
    RegisterUseCase: Symbol.for("RegisterUseCase"),
    ChangePasswordUseCase: Symbol.for("ChangePasswordUseCase"),
    ForgotPasswordUseCase: Symbol.for("ForgotPasswordUseCase"),
    GetCurrentUseUseCase: Symbol.for("GetCurrentUserUseCase"),
    LoginUseCase: Symbol.for("LoginUseCase"),
    LogoutUseCase: Symbol.for("LogoutUseCase"),
    RefreshUseCase: Symbol.for("RefreshUseCase"),
    ResendForgotPasswordOtpUseCase: Symbol.for("ResendForgotPasswordOtpUseCase"),
    ResetPasswordUseCase: Symbol.for("ResetPasswordUseCase"),
    VerifySignUpOtpUseCase: Symbol.for("VerifySignUpOtpUseCase"),
    VerifyOtpUseCase: Symbol.for("VerifyOtpUseCase"),
    ResendSignUpOtpUseCase: Symbol.for("ResendSignUpOtpUseCase"),

    //controllers
    AuthController: Symbol.for("AuthController"),

    //store
    OtpStore: Symbol.for("OtpStore"),
    ResetTokenStore: Symbol.for("ResetTokenStore"),
    SignupStore: Symbol.for("SignupStore"),
    TokenStore: Symbol.for("TokenStore"),
    TokenService: Symbol.for("TokenService"),

    //services
    PasswordHasher: Symbol.for("PasswordHasher"),
    EmailService: Symbol.for("EmailService"),

    //repositories
    UserRepository: Symbol.for("UserRepository"),

    GetUsersByOrganizationUseCase:Symbol.for("GetUsersByOrganizationUseCase"),
    UserController:Symbol.for("UserController"),
    getMeUseCase:Symbol.for("getMeUseCase"),
    updateMeUseCase:Symbol.for("updateMeUseCase")
}