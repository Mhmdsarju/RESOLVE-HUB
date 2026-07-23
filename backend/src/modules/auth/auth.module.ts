// Dependency Injection

import { AuthController } from "./presentation/controllers/AuthController";
import { createAuthRoutes } from "./presentation/routes/auth.routes";

import { RegisterUseCase } from "./application/use-cases/RegisterUseCase";
import { LoginUseCase } from "./application/use-cases/LoginUseCase";
import { RefreshUseCase } from "./application/use-cases/RefreshUseCase";
import { LogoutUseCase } from "./application/use-cases/LogoutUseCase";
import { ForgotPasswordUseCase } from "./application/use-cases/ForgotPasswordUseCase";
import { VerifyOtpUseCase } from "./application/use-cases/VerifyOtpUseCase";
import { VerifySignupOtpUseCase } from "./application/use-cases/VerifySignupOtpUseCase";
import { ResetPasswordUseCase } from "./application/use-cases/ResetPasswordUseCase";

import { PrismaAuthRepository } from "./infrastructure/repositories/PrismaAuthRepository";
import { BcryptPasswordHasher } from "./infrastructure/services/BcryptPasswordHasher";
import { JwtTokenService } from "./infrastructure/services/JwtTokenService";
import { NodemailerEmailService } from "./infrastructure/services/NodemailerEmailService";

import { RedisOtpStore } from "./infrastructure/otp-store/RedisOtpStore";
import { RedisSignupStore } from "./infrastructure/signup-store/RedisSignupStore";
import { RedisTokenStore } from "./infrastructure/token-store/RedisTokenStore";
import { RedisResetTokenStore } from "./infrastructure/reset-token-store/RedisResetTokenStore";

// Infrastructure
const authRepository = new PrismaAuthRepository();
const passwordHasher = new BcryptPasswordHasher();
const tokenService = new JwtTokenService();

const otpStore = new RedisOtpStore();
const signupStore = new RedisSignupStore();
const tokenStore = new RedisTokenStore();
const resetTokenStore = new RedisResetTokenStore();

const emailService = new NodemailerEmailService();

// Use Cases
const registerUseCase = new RegisterUseCase(
  authRepository,
  passwordHasher,
  signupStore,
  otpStore,
  emailService
);

const loginUseCase = new LoginUseCase(
  authRepository,
  passwordHasher,
  tokenService,
  tokenStore
);

const refreshUseCase = new RefreshUseCase(
  tokenService,
  tokenStore
);

const logoutUseCase = new LogoutUseCase(
  tokenService,
  tokenStore
);

const forgotPasswordUseCase = new ForgotPasswordUseCase(
  authRepository,
  otpStore,
  emailService
);

const verifyOtpUseCase = new VerifyOtpUseCase(
  otpStore,
  resetTokenStore,
  tokenService
);

const verifySignupOtpUseCase = new VerifySignupOtpUseCase(
  authRepository,
  otpStore,
  signupStore,
  tokenService,
  tokenStore
);

const resetPasswordUseCase = new ResetPasswordUseCase(
  authRepository,
  passwordHasher,
  tokenService,
  resetTokenStore
);

// Controller
const authController = new AuthController(
  registerUseCase,
  loginUseCase,
  refreshUseCase,
  logoutUseCase,
  forgotPasswordUseCase,
  verifyOtpUseCase,
  verifySignupOtpUseCase,
  resetPasswordUseCase
);

// Routes
export const authRoutes = createAuthRoutes(authController);