import { mock } from "jest-mock-extended";

import { LoginUseCase } from "../modules/auth/application/use-cases/LoginUseCase";

import { User } from "../modules/auth/domain/entities/User";
import { LoginType } from "../modules/auth/domain/enums/LoginType";
import { UserRole } from "../modules/auth/domain/enums/UserRole";

import { IUserRepository } from "../modules/auth/domain/repositories/IUserRepository";
import { IPasswordHasher } from "../modules/auth/domain/interfaces/IPasswordHasher";
import { ITokenService } from "../modules/auth/domain/interfaces/ITokenService";
import { ITokenStore } from "../modules/auth/domain/interfaces/ITokenStore";

// import { AppError } from "../shared/errors/AppError";
import { HttpStatusCode } from "../shared/constant/HttpStatusCode";

describe("LoginUseCase", () => {
  let loginUseCase: LoginUseCase;

  const userRepository = mock<IUserRepository>();
  const passwordHasher = mock<IPasswordHasher>();
  const tokenService = mock<ITokenService>();
  const tokenStore = mock<ITokenStore>();

  beforeEach(() => {
    jest.clearAllMocks();

    loginUseCase = new LoginUseCase(
      userRepository,
      passwordHasher,
      tokenService,
      tokenStore
    );
  });

  describe("execute", () => {
    it("should login successfully", async () => {
      const dto = {
        email: "admin@test.com",
        password: "Password@123",
        loginType: LoginType.ORGANIZATION,
      };

      const user = new User({
        id: "user-1",
        name: "Sarju",
        email: "admin@test.com",
        password: "hashed-password",
        organizationId: "org-1",
        role: UserRole.ORG_ADMIN,
      });

      userRepository.findByEmail.mockResolvedValue(user);
      passwordHasher.compare.mockResolvedValue(true);

      tokenService.generateAccessToken.mockResolvedValue("access-token");
      tokenService.generateRefreshToken.mockResolvedValue("refresh-token");

      tokenStore.saveRefreshToken.mockResolvedValue();

      const result = await loginUseCase.execute(dto);

      expect(result.user).toEqual({
        id: "user-1",
        name: "Sarju",
        email: "admin@test.com",
        organizationId: "org-1",
        role: UserRole.ORG_ADMIN,
      });

      expect(result.accessToken).toBe("access-token");
      expect(result.refreshToken).toBe("refresh-token");

      expect(userRepository.findByEmail).toHaveBeenCalledWith(dto.email);

      expect(passwordHasher.compare).toHaveBeenCalledWith(
        dto.password,
        user.password
      );

      expect(tokenService.generateAccessToken).toHaveBeenCalledWith({
        userId: user.id!,
        organizationId: user.organizationId,
        role: user.role,
      });

      expect(tokenService.generateRefreshToken).toHaveBeenCalledWith({
        userId: user.id!,
        organizationId: user.organizationId,
        role: user.role,
      });

      expect(tokenStore.saveRefreshToken).toHaveBeenCalledWith(
        user.id!,
        "refresh-token"
      );
    });

    it("should throw AppError if user is not found", async () => {
      const dto = {
        email: "admin@test.com",
        password: "Password@123",
        loginType: LoginType.ORGANIZATION,
      };

      userRepository.findByEmail.mockResolvedValue(null);

      await expect(loginUseCase.execute(dto)).rejects.toMatchObject({
        message: "Invalid email or password",
        statusCode: HttpStatusCode.UNAUTHORIZED,
      });
    });

    it("should throw AppError if password is invalid", async () => {
      const dto = {
        email: "admin@test.com",
        password: "WrongPassword",
        loginType: LoginType.ORGANIZATION,
      };

      const user = new User({
        id: "user-1",
        name: "Sarju",
        email: "admin@test.com",
        password: "hashed-password",
        organizationId: "org-1",
        role: UserRole.ORG_ADMIN,
      });

      userRepository.findByEmail.mockResolvedValue(user);
      passwordHasher.compare.mockResolvedValue(false);

      await expect(loginUseCase.execute(dto)).rejects.toMatchObject({
        message: "Invalid email or password",
        statusCode: HttpStatusCode.UNAUTHORIZED,
      });
    });

    it("should throw AppError when ORG_ADMIN logs in through user login", async () => {
      const dto = {
        email: "admin@test.com",
        password: "Password@123",
        loginType: LoginType.USER,
      };

      const user = new User({
        id: "user-1",
        name: "Sarju",
        email: "admin@test.com",
        password: "hashed-password",
        organizationId: "org-1",
        role: UserRole.ORG_ADMIN,
      });

      userRepository.findByEmail.mockResolvedValue(user);
      passwordHasher.compare.mockResolvedValue(true);

      await expect(loginUseCase.execute(dto)).rejects.toMatchObject({
        message: "Please login through the Organization Login page.",
        statusCode: HttpStatusCode.FORBIDDEN,
      });
    });

    it("should throw AppError when ENGINEER logs in through organization login", async () => {
      const dto = {
        email: "engineer@test.com",
        password: "Password@123",
        loginType: LoginType.ORGANIZATION,
      };

      const user = new User({
        id: "user-2",
        name: "Engineer",
        email: "engineer@test.com",
        password: "hashed-password",
        organizationId: "org-1",
        role: UserRole.ENGINEER,
      });

      userRepository.findByEmail.mockResolvedValue(user);
      passwordHasher.compare.mockResolvedValue(true);

      await expect(loginUseCase.execute(dto)).rejects.toMatchObject({
        message: "Please login through the User Login page.",
        statusCode: HttpStatusCode.FORBIDDEN,
      });
    });
  });
});