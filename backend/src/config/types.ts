export const TYPES = {
  //repositories
  UserRepository: Symbol.for("UserRepository"),
  OrganizationRepository: Symbol.for("OrganizationRepository"),

  //services
  PasswordHasher: Symbol.for("PasswordHasher"),
  EmailService: Symbol.for("EmailService"),

  //store
  OtpStore: Symbol.for("OtpStore"),
  ResetTokenStore: Symbol.for("ResetTokenStore"),
  SignupStore: Symbol.for("SignupStore"),
  TokenStore: Symbol.for("TokenStore"),
  TokenService: Symbol.for("TokenService"),

  //controllers
  AuthController: Symbol.for("AuthController"),
  OrganizationController: Symbol.for("OrganizationController"),

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
  //org
  GetOrganizationProfileUseCase: Symbol.for("GetOrganizationProfileUseCase"),
  UpdateOrganizationUseCase: Symbol.for("UpdateOrganizationUseCase"),

  
} as const;