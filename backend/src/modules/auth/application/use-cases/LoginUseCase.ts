import { LoginDto } from "../dto/LoginDto";

import { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import { IPasswordHasher } from "../../domain/interfaces/IPasswordHasher";
import { ITokenService } from "../../domain/interfaces/ITokenService";
import { ITokenStore } from "../../domain/interfaces/ITokenStore";

import { LoginType } from "../../domain/enums/LoginType";
import { UserRole } from "../../domain/enums/UserRole";
import { AppError } from "../../../../shared/errors/AppError";

export class LoginUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly tokenService: ITokenService,
    private readonly tokenStore: ITokenStore
  ) { }

  async execute(dto: LoginDto) {
    // 1. Find user
    const user = await this.authRepository.findUserByEmail(dto.email);

    if (!user) {
      throw new AppError(
        "Invalid email or password",
        401,
      );
    }

    // 2. Compare password
    const isPasswordValid = await this.passwordHasher.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new AppError(
        "Invalid email or password",
        401,
      );
    }

    // 3. Check login type
    if (
      dto.loginType === LoginType.ORGANIZATION && user.role !== UserRole.ORG_ADMIN
    ) {
      throw new AppError(
        "Please login through the User Login page.",
        403,
      );
    }

    if (
      dto.loginType === LoginType.USER && user.role === UserRole.ORG_ADMIN
    ) {
      throw new AppError(
        "Please login through the Organization Login page.",
        403,
      );
    }

    // 4. JWT Payload
    const payload = {
      userId: user.id!,
      organizationId: user.organizationId,
      role: user.role,
    };

    // 5. Generate Tokens
    const accessToken = await this.tokenService.generateAccessToken(payload);

    const refreshToken = await this.tokenService.generateRefreshToken(payload);

    // 6. Save Refresh Token
    await this.tokenStore.saveRefreshToken(user.id!, refreshToken);

    // 7. Return
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        organizationId: user.organizationId,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }
}