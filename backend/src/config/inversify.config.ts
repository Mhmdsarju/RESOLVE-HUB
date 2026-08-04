import { Container } from "inversify";
import { TYPES } from "./types";
import { IPasswordHasher } from "../modules/auth/domain/interfaces/IPasswordHasher";
import { BcryptPasswordHasher } from "../modules/auth/infrastructure/services/BcryptPasswordHasher";
import { IEmailService } from "../modules/auth/domain/interfaces/IEmailService";
import { NodemailerEmailService } from "../modules/auth/infrastructure/services/NodemailerEmailService";
import { IOtpStore } from "../modules/auth/domain/interfaces/IOtpStore";
import { RedisOtpStore } from "../modules/auth/infrastructure/otp-store/RedisOtpStore";
import { IResetTokenStore } from "../modules/auth/domain/interfaces/IResetTokenStore";
import { RedisResetTokenStore } from "../modules/auth/infrastructure/reset-token-store/RedisResetTokenStore";
import { ISignupStore } from "../modules/auth/domain/interfaces/ISignupStore";
import { RedisSignupStore } from "../modules/auth/infrastructure/signup-store/RedisSignupStore";
import { ITokenStore } from "../modules/auth/domain/interfaces/ITokenStore";
import { RedisTokenStore } from "../modules/auth/infrastructure/token-store/RedisTokenStore";
import { ITokenService } from "../modules/auth/domain/interfaces/ITokenService";
import { JwtTokenService } from "../modules/auth/infrastructure/services/JwtTokenService";
import { IRegisterUseCase } from "../modules/auth/domain/interfaces/use-cases/IRegisterUseCase";
import { RegisterUseCase } from "../modules/auth/application/use-cases/RegisterUseCase";
import { IChangePasswordUseCase } from "../modules/auth/domain/interfaces/use-cases/IChangePasswordUsecase";
import { ChangePasswordUseCase } from "../modules/auth/application/use-cases/ChangePasswordUseCase";
import { IForgotPasswordUseCase } from "../modules/auth/domain/interfaces/use-cases/IForgotPasswordUseCase";
import { ForgotPasswordUseCase } from "../modules/auth/application/use-cases/ForgotPasswordUseCase";
import { IGetCurrentUseCase } from "../modules/auth/domain/interfaces/use-cases/IGetCurrentUseCase";
import { GetCurrentUserUseCase } from "../modules/auth/application/use-cases/GetCurrentUserUseCase";
import { ILoginUseCase } from "../modules/auth/domain/interfaces/use-cases/ILoginUseCase";
import { LoginUseCase } from "../modules/auth/application/use-cases/LoginUseCase";
import { ILogoutUsecase } from "../modules/auth/domain/interfaces/use-cases/ILogoutUseCase";
import { LogoutUseCase } from "../modules/auth/application/use-cases/LogoutUseCase";
import { IRefreshUseCase } from "../modules/auth/domain/interfaces/use-cases/IRefreshUseCase";
import { RefreshUseCase } from "../modules/auth/application/use-cases/RefreshUseCase";
import { IResendForgotPasswordOtpUseCase } from "../modules/auth/domain/interfaces/use-cases/IResendForgotPasswordOtpUseCase";
import { ResendForgotPasswordOtpUseCase } from "../modules/auth/application/use-cases/ResendForgotPasswordOtpUseCase";
import { IResetPasswordUseCase } from "../modules/auth/domain/interfaces/use-cases/IResetPasswordUseCase";
import { ResetPasswordUseCase } from "../modules/auth/application/use-cases/ResetPasswordUseCase";
import { IVerifySignupOtpUseCase } from "../modules/auth/domain/interfaces/use-cases/IVerifySignupOtpUseCase";
import { VerifyOtpUseCase } from "../modules/auth/application/use-cases/VerifyOtpUseCase";
import { IVerifyOtpUseCase } from "../modules/auth/domain/interfaces/use-cases/IVerifyOtpUseCase";
import { VerifySignupOtpUseCase } from "../modules/auth/application/use-cases/VerifySignupOtpUseCase";
import { IResendSignupOtpUseCase } from "../modules/auth/domain/interfaces/use-cases/IResendSignupOtpUseCase";
import { ResendSignupOtpUseCase } from "../modules/auth/application/use-cases/ResendSignupOtpUseCase";
import { AuthController } from "../modules/auth/presentation/controllers/AuthController";

import { IUserRepository } from "../modules/auth/domain/repositories/IUserRepository";
import { PrismaUserRepository } from "../modules/auth/infrastructure/repositories/PrismaUserRepository";

import { IOrganizationRepository } from "../modules/organization/domain/repositories/IOrganizationRepository";
import { PrismaOrganizationRepository } from "../modules/organization/infrastructure/repositories/PrismaOrganizationRepository";

import { IGetOrganizationProfileUseCase } from "../modules/organization/domain/interfaces/IGetOrganizationProfileUseCase";
import { GetOrganizationProfileUseCase } from "../modules/organization/application/use-cases/GetOrganizationProfileUseCase";

import { IUpdateOrganizationUseCase } from "../modules/organization/domain/interfaces/IUpdateOrganizationUseCase";
import { UpdateOrganizationUseCase } from "../modules/organization/application/use-cases/UpdateOrganizationUseCase";
import { OrganizationController } from "../modules/organization/presentation/controllers/OrganizationController";


const container = new Container();

container.bind<IUserRepository>(TYPES.UserRepository).to(PrismaUserRepository).inSingletonScope();

container.bind<IOrganizationRepository>(TYPES.OrganizationRepository).to(PrismaOrganizationRepository).inSingletonScope();

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

container.bind<IGetOrganizationProfileUseCase>(TYPES.GetOrganizationProfileUseCase).to(GetOrganizationProfileUseCase).inSingletonScope();
container.bind<IUpdateOrganizationUseCase>(TYPES.UpdateOrganizationUseCase).to(UpdateOrganizationUseCase).inSingletonScope();

container.bind<AuthController>(TYPES.AuthController).to(AuthController).inSingletonScope();
container.bind<OrganizationController>(TYPES.OrganizationController).to(OrganizationController).inSingletonScope();

export default container;