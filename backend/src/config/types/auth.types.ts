export const AUTH_TYPES = {

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

}