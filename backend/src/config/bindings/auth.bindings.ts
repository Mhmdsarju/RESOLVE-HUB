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
import { OtpController } from "@/modules/auth/presentation/controllers/OtpController";
import { PasswordController } from "@/modules/auth/presentation/controllers/PasswordController";

export function bindAuth(container: Container) {

    container.bind<IUserRepository>(TYPES.UserRepository).to(PrismaUserRepository).inSingletonScope();

    container.bind<IPasswordHasher>(TYPES.PasswordHasher).to(BcryptPasswordHasher).inSingletonScope();
    container.bind<IEmailService>(TYPES.EmailService).to(NodemailerEmailService).inSingletonScope();
    container.bind<IOtpStore>(TYPES.OtpStore).to(RedisOtpStore).inSingletonScope();
    container.bind<IResetTokenStore>(TYPES.ResetTokenStore).to(RedisResetTokenStore).inSingletonScope();
    container.bind<ISignupStore>(TYPES.SignupStore).to(RedisSignupStore).inSingletonScope();
    container.bind<ITokenStore>(TYPES.TokenStore).to(RedisTokenStore).inSingletonScope();
    container.bind<ITokenService>(TYPES.TokenService).to(JwtTokenService).inSingletonScope();

    container.bind<IRegisterUseCase>(TYPES.RegisterUseCase).to(RegisterUseCase);
    container.bind<IChangePasswordUseCase>(TYPES.ChangePasswordUseCase).to(ChangePasswordUseCase);
    container.bind<IForgotPasswordUseCase>(TYPES.ForgotPasswordUseCase).to(ForgotPasswordUseCase);
    container.bind<IGetCurrentUseCase>(TYPES.GetCurrentUseUseCase).to(GetCurrentUserUseCase);
    container.bind<ILoginUseCase>(TYPES.LoginUseCase).to(LoginUseCase);
    container.bind<ILogoutUsecase>(TYPES.LogoutUseCase).to(LogoutUseCase);
    container.bind<IRefreshUseCase>(TYPES.RefreshUseCase).to(RefreshUseCase);
    container.bind<IResendForgotPasswordOtpUseCase>(TYPES.ResendForgotPasswordOtpUseCase).to(ResendForgotPasswordOtpUseCase);
    container.bind<IResetPasswordUseCase>(TYPES.ResetPasswordUseCase).to(ResetPasswordUseCase);
    container.bind<IVerifyOtpUseCase>(TYPES.VerifyOtpUseCase).to(VerifyOtpUseCase)
    container.bind<IVerifySignupOtpUseCase>(TYPES.VerifySignUpOtpUseCase).to(VerifySignupOtpUseCase);
    container.bind<IResendSignupOtpUseCase>(TYPES.ResendSignUpOtpUseCase).to(ResendSignupOtpUseCase);


    container.bind<IGetUsersByOrganizationUseCase>(TYPES.GetUsersByOrganizationUseCase).to(GetUsersByOrganizationUseCase);
    container.bind<IGetMeUseCase>(TYPES.getMeUseCase).to(GetMeUseCase)
    container.bind<IUpdateMeUseCase>(TYPES.updateMeUseCase).to(UpdateMeUseCase);
    
    container.bind<AuthController>(TYPES.AuthController).to(AuthController).inSingletonScope();
    container.bind<UserController>(TYPES.UserController).to(UserController).inSingletonScope();
    container.bind<OtpController>(TYPES.OtpController).to(OtpController).inSingletonScope();
    container.bind<PasswordController>(TYPES.PasswordController).to(PasswordController).inSingletonScope();
}