//Dependency Injection
import { AuthController } from "./presentation/controllers/AuthController";
import { createAuthRoutes } from "./presentation/routes/auth.routes";

import { RegisterUseCase } from "./application/use-cases/RegisterUseCase";
import { LoginUseCase } from "./application/use-cases/LoginUseCase";
import { RefreshUseCase } from "./application/use-cases/RefreshUseCase";
import { LogoutUseCase } from "./application/use-cases/LogoutUseCase";
import { ForgotPasswordUseCase } from "./application/use-cases/ForgotPasswordUseCase";
import { RedisOtpStore } from "./infrastructure/otp-store/RedisOtpStore";
import { NodemailerEmailService } from "./infrastructure/services/NodemailerEmailService";

import { PrismaAuthRepository } from "./infrastructure/repositories/PrismaAuthRepository";
import { BcryptPasswordHasher } from "./infrastructure/services/BcryptPasswordHasher";
import { JwtTokenService } from "./infrastructure/services/JwtTokenService";
import { RedisTokenStore } from "./infrastructure/token-store/RedisTokenStore";
import { VerifyOtpUseCase } from "./application/use-cases/VerifyOtpUseCase";
import { RedisResetTokenStore } from "./infrastructure/reset-token-store/RedisResetTokenStore";
import { ResetPasswordUseCase } from "./application/use-cases/ResetPasswordUseCase";

// Infrastructure
const authRepository = new PrismaAuthRepository();
const passwordHasher = new BcryptPasswordHasher();
const tokenService = new JwtTokenService();
const tokenStore = new RedisTokenStore();
const otpStore = new RedisOtpStore();
const emailService = new NodemailerEmailService();
const resetTokenStore = new RedisResetTokenStore();

// Use Cases
const registerUseCase = new RegisterUseCase(authRepository, passwordHasher, tokenService, tokenStore);
const loginUseCase = new LoginUseCase(authRepository, passwordHasher, tokenService, tokenStore);
const refreshUseCase = new RefreshUseCase(tokenService, tokenStore);
const logoutUseCase = new LogoutUseCase(tokenService, tokenStore);
const forgotPasswordUseCase = new ForgotPasswordUseCase(authRepository, otpStore, emailService);
const verifyOtpUseCase = new VerifyOtpUseCase(otpStore, resetTokenStore, tokenService);
const resetPasswordUseCase = new ResetPasswordUseCase(authRepository, passwordHasher, tokenService, resetTokenStore);

// Controllers
const authController = new AuthController(
    registerUseCase,
    loginUseCase,
    refreshUseCase,
    logoutUseCase,
    forgotPasswordUseCase,
    verifyOtpUseCase,
    resetPasswordUseCase
);

// Routes
export const authRoutes = createAuthRoutes(authController);