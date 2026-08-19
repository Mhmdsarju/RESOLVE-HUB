import { Container } from "inversify";
import { TYPES } from "../types";
import { IRegisterUseCase } from "@/modules/auth/domain/interfaces/use-cases/IRegisterUseCase";
import { ChangePasswordUseCase } from "@/modules/auth/application/use-cases/ChangePasswordUseCase";
import { ForgotPasswordUseCase } from "@/modules/auth/application/use-cases/ForgotPasswordUseCase";
import { GetCurrentUserUseCase } from "@/modules/auth/application/use-cases/GetCurrentUserUseCase";
import { LoginUseCase } from "@/modules/auth/application/use-cases/LoginUseCase";
import { LogoutUseCase } from "@/modules/auth/application/use-cases/LogoutUseCase";
import { RefreshUseCase } from "@/modules/auth/application/use-cases/RefreshUseCase";
import { RegisterUseCase } from "@/modules/auth/application/use-cases/RegisterUseCase";
import { ResendForgotPasswordOtpUseCase } from "@/modules/auth/application/use-cases/ResendForgotPasswordOtpUseCase";
import { ResendSignupOtpUseCase } from "@/modules/auth/application/use-cases/ResendSignupOtpUseCase";
import { ResetPasswordUseCase } from "@/modules/auth/application/use-cases/ResetPasswordUseCase";
import { VerifyOtpUseCase } from "@/modules/auth/application/use-cases/VerifyOtpUseCase";
import { VerifySignupOtpUseCase } from "@/modules/auth/application/use-cases/VerifySignupOtpUseCase";
import { IEmailService } from "@/modules/auth/domain/interfaces/IEmailService";
import { IOtpStore } from "@/modules/auth/domain/interfaces/IOtpStore";
import { IPasswordHasher } from "@/modules/auth/domain/interfaces/IPasswordHasher";
import { IResetTokenStore } from "@/modules/auth/domain/interfaces/IResetTokenStore";
import { ISignupStore } from "@/modules/auth/domain/interfaces/ISignupStore";
import { ITokenService } from "@/modules/auth/domain/interfaces/ITokenService";
import { ITokenStore } from "@/modules/auth/domain/interfaces/ITokenStore";
import { IChangePasswordUseCase } from "@/modules/auth/domain/interfaces/use-cases/IChangePasswordUsecase";
import { IForgotPasswordUseCase } from "@/modules/auth/domain/interfaces/use-cases/IForgotPasswordUseCase";
import { IGetCurrentUseCase } from "@/modules/auth/domain/interfaces/use-cases/IGetCurrentUseCase";
import { ILoginUseCase } from "@/modules/auth/domain/interfaces/use-cases/ILoginUseCase";
import { ILogoutUsecase } from "@/modules/auth/domain/interfaces/use-cases/ILogoutUseCase";
import { IRefreshUseCase } from "@/modules/auth/domain/interfaces/use-cases/IRefreshUseCase";
import { IResendForgotPasswordOtpUseCase } from "@/modules/auth/domain/interfaces/use-cases/IResendForgotPasswordOtpUseCase";
import { IResendSignupOtpUseCase } from "@/modules/auth/domain/interfaces/use-cases/IResendSignupOtpUseCase";
import { IResetPasswordUseCase } from "@/modules/auth/domain/interfaces/use-cases/IResetPasswordUseCase";
import { IVerifyOtpUseCase } from "@/modules/auth/domain/interfaces/use-cases/IVerifyOtpUseCase";
import { IVerifySignupOtpUseCase } from "@/modules/auth/domain/interfaces/use-cases/IVerifySignupOtpUseCase";
import { IUserRepository } from "@/modules/auth/domain/repositories/IUserRepository";
import { RedisOtpStore } from "@/modules/auth/infrastructure/otp-store/RedisOtpStore";
import { PrismaUserRepository } from "@/modules/auth/infrastructure/repositories/PrismaUserRepository";
import { RedisResetTokenStore } from "@/modules/auth/infrastructure/reset-token-store/RedisResetTokenStore";
import { BcryptPasswordHasher } from "@/modules/auth/infrastructure/services/BcryptPasswordHasher";
import { JwtTokenService } from "@/modules/auth/infrastructure/services/JwtTokenService";
import { NodemailerEmailService } from "@/modules/auth/infrastructure/services/NodemailerEmailService";
import { RedisSignupStore } from "@/modules/auth/infrastructure/signup-store/RedisSignupStore";
import { RedisTokenStore } from "@/modules/auth/infrastructure/token-store/RedisTokenStore";
import { AuthController } from "@/modules/auth/presentation/controllers/AuthController";
import { IGetUsersByOrganizationUseCase } from "@/modules/auth/domain/interfaces/use-cases/IGetUsersByOrganizationUseCase";
import { GetUsersByOrganizationUseCase } from "@/modules/auth/application/use-cases/GetUsersByOrganizationUseCase";
import { UserController } from "@/modules/auth/presentation/controllers/UserController";
import { IGetMeUseCase } from "@/modules/auth/domain/interfaces/use-cases/IGetMeUseCase";
import { GetMeUseCase } from "@/modules/auth/application/use-cases/GetMeUseCase";
import { IUpdateMeUseCase } from "@/modules/auth/domain/interfaces/use-cases/IUpdateMeUseCase";
import { UpdateMeUseCase } from "@/modules/auth/application/use-cases/UpdateMeUseCase";

export function bindAuth(container: Container) {

    container.bind<IUserRepository>(TYPES.UserRepository).to(PrismaUserRepository).inSingletonScope();

    container.bind<IPasswordHasher>(TYPES.PasswordHasher).to(BcryptPasswordHasher).inSingletonScope();
    container.bind<IEmailService>(TYPES.EmailService).to(NodemailerEmailService).inSingletonScope();
    container.bind<IOtpStore>(TYPES.OtpStore).to(RedisOtpStore).inSingletonScope();
    container.bind<IResetTokenStore>(TYPES.ResetTokenStore).to(RedisResetTokenStore).inSingletonScope();
    container.bind<ISignupStore>(TYPES.SignupStore).to(RedisSignupStore).inSingletonScope();
    container.bind<ITokenStore>(TYPES.TokenStore).to(RedisTokenStore).inSingletonScope();
    container.bind<ITokenService>(TYPES.TokenService).to(JwtTokenService).inSingletonScope();

    container.bind<IRegisterUseCase>(TYPES.RegisterUseCase).to(RegisterUseCase).inSingletonScope();
    container.bind<IChangePasswordUseCase>(TYPES.ChangePasswordUseCase).to(ChangePasswordUseCase).inSingletonScope();
    container.bind<IForgotPasswordUseCase>(TYPES.ForgotPasswordUseCase).to(ForgotPasswordUseCase).inSingletonScope();
    container.bind<IGetCurrentUseCase>(TYPES.GetCurrentUseUseCase).to(GetCurrentUserUseCase).inSingletonScope();
    container.bind<ILoginUseCase>(TYPES.LoginUseCase).to(LoginUseCase).inSingletonScope();
    container.bind<ILogoutUsecase>(TYPES.LogoutUseCase).to(LogoutUseCase).inSingletonScope();
    container.bind<IRefreshUseCase>(TYPES.RefreshUseCase).to(RefreshUseCase).inSingletonScope();
    container.bind<IResendForgotPasswordOtpUseCase>(TYPES.ResendForgotPasswordOtpUseCase).to(ResendForgotPasswordOtpUseCase).inSingletonScope();
    container.bind<IResetPasswordUseCase>(TYPES.ResetPasswordUseCase).to(ResetPasswordUseCase).inSingletonScope();
    container.bind<IVerifyOtpUseCase>(TYPES.VerifyOtpUseCase).to(VerifyOtpUseCase).inSingletonScope()
    container.bind<IVerifySignupOtpUseCase>(TYPES.VerifySignUpOtpUseCase).to(VerifySignupOtpUseCase).inSingletonScope();
    container.bind<IResendSignupOtpUseCase>(TYPES.ResendSignUpOtpUseCase).to(ResendSignupOtpUseCase).inSingletonScope();


    container.bind<AuthController>(TYPES.AuthController).to(AuthController).inSingletonScope();
    container.bind<IGetUsersByOrganizationUseCase>(TYPES.GetUsersByOrganizationUseCase).to(GetUsersByOrganizationUseCase).inSingletonScope();
    container.bind<UserController>(TYPES.UserController).to(UserController).inSingletonScope();
    container.bind<IGetMeUseCase>(TYPES.getMeUseCase).to(GetMeUseCase).inSingletonScope()
    container.bind<IUpdateMeUseCase>(TYPES.updateMeUseCase).to(UpdateMeUseCase).inSingletonScope();
}