import { Container } from "inversify";
import { TYPES } from "../types";
import { IEmailService } from "@/modules/auth/domain/interfaces/IEmailService";
import { IOtpStore } from "@/modules/auth/domain/interfaces/IOtpStore";
import { IPasswordHasher } from "@/modules/auth/domain/interfaces/IPasswordHasher";
import { IResetTokenStore } from "@/modules/auth/domain/interfaces/IResetTokenStore";
import { ISignupStore } from "@/modules/auth/domain/interfaces/ISignupStore";
import { ITokenService } from "@/modules/auth/domain/interfaces/ITokenService";
import { ITokenStore } from "@/modules/auth/domain/interfaces/ITokenStore";
import { IUserRepository } from "@/modules/auth/domain/repositories/IUserRepository";
import { RedisOtpStore } from "@/modules/auth/infrastructure/otp-store/RedisOtpStore";
import { RedisResetTokenStore } from "@/modules/auth/infrastructure/reset-token-store/RedisResetTokenStore";
import { BcryptPasswordHasher } from "@/modules/auth/infrastructure/services/BcryptPasswordHasher";
import { JwtTokenService } from "@/modules/auth/infrastructure/services/JwtTokenService";
import { NodemailerEmailService } from "@/modules/auth/infrastructure/services/NodemailerEmailService";
import { RedisSignupStore } from "@/modules/auth/infrastructure/signup-store/RedisSignupStore";
import { RedisTokenStore } from "@/modules/auth/infrastructure/token-store/RedisTokenStore";
import { AuthController } from "@/modules/auth/presentation/controllers/AuthController";
import { UserController } from "@/modules/auth/presentation/controllers/UserController";
import { OtpController } from "@/modules/auth/presentation/controllers/OtpController";
import { PasswordController } from "@/modules/auth/presentation/controllers/PasswordController";
import { IOrganizationRepository } from "@/modules/organization/domain/repositories/IOrganizationRepository";
import { ChangePasswordUseCase } from "@/modules/auth/application/use-cases/ChangePasswordUseCase";
import { ForgotPasswordUseCase } from "@/modules/auth/application/use-cases/ForgotPasswordUseCase";
import { GetMeUseCase } from "@/modules/auth/application/use-cases/GetMeUseCase";
import { GetUsersByOrganizationUseCase } from "@/modules/auth/application/use-cases/GetUsersByOrganizationUseCase";
import { LoginUseCase } from "@/modules/auth/application/use-cases/LoginUseCase";
import { LogoutUseCase } from "@/modules/auth/application/use-cases/LogoutUseCase";
import { RefreshUseCase } from "@/modules/auth/application/use-cases/RefreshUseCase";
import { ResendForgotPasswordOtpUseCase } from "@/modules/auth/application/use-cases/ResendForgotPasswordOtpUseCase";
import { ResendSignupOtpUseCase } from "@/modules/auth/application/use-cases/ResendSignupOtpUseCase";
import { ResetPasswordUseCase } from "@/modules/auth/application/use-cases/ResetPasswordUseCase";
import { UpdateMeUseCase } from "@/modules/auth/application/use-cases/UpdateMeUseCase";
import { VerifyOtpUseCase } from "@/modules/auth/application/use-cases/VerifyOtpUseCase";
import { VerifySignupOtpUseCase } from "@/modules/auth/application/use-cases/VerifySignupOtpUseCase";
import { RegisterUseCase } from "@/modules/auth/application/use-cases/RegisterUseCase";
import { createAuthRoutes } from "@/modules/auth/presentation/routes/auth.routes";
import { createUserRoutes } from "@/modules/auth/presentation/routes/user.routes";
import { setTokenService } from "@/app/middlewares/authMiddleware";
import { GetUserByIdUseCase } from "@/modules/auth/application/use-cases/GetUserByIdUseCase";
import { ICreateAuditLogUseCase } from "@/modules/audit-log/domain/interface/usecase/ICreateAuditLogUseCase";


export function bindAuth(container: Container, createAuditLogUseCase: ICreateAuditLogUseCase) {

    container.bind<IPasswordHasher>(TYPES.PasswordHasher).to(BcryptPasswordHasher).inSingletonScope();
    container.bind<IEmailService>(TYPES.EmailService).to(NodemailerEmailService).inSingletonScope();
    container.bind<IOtpStore>(TYPES.OtpStore).to(RedisOtpStore).inSingletonScope();
    container.bind<IResetTokenStore>(TYPES.ResetTokenStore).to(RedisResetTokenStore).inSingletonScope();
    container.bind<ISignupStore>(TYPES.SignupStore).to(RedisSignupStore).inSingletonScope();
    container.bind<ITokenStore>(TYPES.TokenStore).to(RedisTokenStore).inSingletonScope();
    container.bind<ITokenService>(TYPES.TokenService).to(JwtTokenService).inSingletonScope();

    const userRepository = container.get<IUserRepository>(TYPES.UserRepository);
    const organizationRepository = container.get<IOrganizationRepository>(TYPES.OrganizationRepository);
    const passwordHasher = container.get<IPasswordHasher>(TYPES.PasswordHasher);
    const signupStore = container.get<ISignupStore>(TYPES.SignupStore);
    const otpStore = container.get<IOtpStore>(TYPES.OtpStore);
    const emailService = container.get<IEmailService>(TYPES.EmailService);
    const tokenService = container.get<ITokenService>(TYPES.TokenService);
    setTokenService(tokenService);
    const tokenStore = container.get<ITokenStore>(TYPES.TokenStore);
    const resetTokenStore = container.get<IResetTokenStore>(TYPES.ResetTokenStore);

    const registerUseCase = new RegisterUseCase(
        userRepository,
        organizationRepository,
        passwordHasher,
        signupStore,
        otpStore,
        emailService,
    );

    const changePasswordUseCase = new ChangePasswordUseCase(
        userRepository,
        passwordHasher,
    );

    const forgotPasswordUseCase = new ForgotPasswordUseCase(
        userRepository,
        otpStore,
        emailService,
    );

    // const getCurrentUserUseCase = new GetCurrentUserUseCase(
    //     userRepository,
    // );

    const getMeUseCase = new GetMeUseCase(
        userRepository,
    );

    const getUsersByOrganizationUseCase = new GetUsersByOrganizationUseCase(
        userRepository,
    );

    const loginUseCase = new LoginUseCase(
        userRepository,
        passwordHasher,
        tokenService,
        tokenStore,
        createAuditLogUseCase
    );

    const logoutUseCase = new LogoutUseCase(
        tokenService,
        tokenStore,
        userRepository,
        createAuditLogUseCase,
    );

    const refreshUseCase = new RefreshUseCase(
        tokenService,
        tokenStore,
    );

    const resendForgotPasswordOtpUseCase = new ResendForgotPasswordOtpUseCase(
        userRepository,
        otpStore,
        emailService,
    );

    const resendSignupOtpUseCase = new ResendSignupOtpUseCase(
        signupStore,
        otpStore,
        emailService,
    );

    const resetPasswordUseCase = new ResetPasswordUseCase(
        userRepository,
        passwordHasher,
        tokenService,
        resetTokenStore,
    );

    const updateMeUseCase = new UpdateMeUseCase(
        userRepository,
        createAuditLogUseCase
    );

    const verifyOtpUseCase = new VerifyOtpUseCase(
        otpStore,
        resetTokenStore,
        tokenService,
    );

    const verifySignupOtpUseCase = new VerifySignupOtpUseCase(
        userRepository,
        organizationRepository,
        otpStore,
        signupStore,
        tokenService,
        tokenStore,
    );

    const getUserByIdUseCase = new GetUserByIdUseCase(
        userRepository
    )

    const authController = new AuthController(
        registerUseCase,
        loginUseCase,
        refreshUseCase,
        logoutUseCase
    )

    const otpController = new OtpController(
        verifyOtpUseCase,
        verifySignupOtpUseCase,
        resendSignupOtpUseCase,
        resendForgotPasswordOtpUseCase
    )

    const passwordController = new PasswordController(
        forgotPasswordUseCase,
        resetPasswordUseCase,
        changePasswordUseCase
    )



    const userController = new UserController(
        getUsersByOrganizationUseCase,
        getMeUseCase,
        updateMeUseCase,
        getUserByIdUseCase
    )

    const authRouter = createAuthRoutes(
        authController,
        otpController,
        passwordController
    )

    const userRouter = createUserRoutes(
        userController
    )


    return {
        authRouter,
        userRouter,
        getUserByIdUseCase
    };

}