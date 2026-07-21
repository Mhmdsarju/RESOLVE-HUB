//Dependency Injection
import { AuthController } from "./presentation/controllers/AuthController";
import { createAuthRoutes } from "./presentation/routes/auth.routes";

import { RegisterUseCase } from "./application/use-cases/RegisterUseCase";
import { LoginUseCase } from "./application/use-cases/LoginUseCase";
import { RefreshUseCase } from "./application/use-cases/RefreshUseCase";
import { LogoutUseCase } from "./application/use-cases/LogoutUseCase";

import { PrismaAuthRepository } from "./infrastructure/repositories/PrismaAuthRepository";
import { BcryptPasswordHasher } from "./infrastructure/services/BcryptPasswordHasher";
import { JwtTokenService } from "./infrastructure/services/JwtTokenService";
import { RedisTokenStore } from "./infrastructure/token-store/RedisTokenStore";

// Infrastructure
const authRepository = new PrismaAuthRepository();
const passwordHasher = new BcryptPasswordHasher();
const tokenService = new JwtTokenService();
const tokenStore = new RedisTokenStore();

// Use Cases
const registerUseCase = new RegisterUseCase(authRepository, passwordHasher, tokenService, tokenStore);
const loginUseCase = new LoginUseCase(authRepository, passwordHasher, tokenService, tokenStore);
const refreshUseCase = new RefreshUseCase(tokenService, tokenStore);
const logoutUseCase= new LogoutUseCase(tokenService,tokenStore)

// Controllers
const authController = new AuthController(registerUseCase, loginUseCase, refreshUseCase,logoutUseCase);

// Routes
export const authRoutes = createAuthRoutes(authController);