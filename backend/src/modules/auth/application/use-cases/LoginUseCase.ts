import { LoginDto } from "../dto/LoginDto";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IPasswordHasher } from "../../domain/interfaces/IPasswordHasher";
import { ITokenService } from "../../domain/interfaces/ITokenService";
import { ITokenStore } from "../../domain/interfaces/ITokenStore";

import { LoginType } from "../../domain/enums/LoginType";
import { UserRole } from "../../domain/enums/UserRole";
import { AppError } from "../../../../shared/errors/AppError";

import { injectable, inject } from "inversify";
import { TYPES } from "../../../../config/types";
import { ILoginUseCase } from "../../domain/interfaces/use-cases/ILoginUseCase";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { ErrorMessages } from "../../../../shared/constant/ErrorMessages";

@injectable()
export class LoginUseCase implements ILoginUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,
    @inject(TYPES.PasswordHasher)
    private readonly passwordHasher: IPasswordHasher,
    @inject(TYPES.TokenService)
    private readonly tokenService: ITokenService,
    @inject(TYPES.TokenStore)
    private readonly tokenStore: ITokenStore
  ) { }

  async execute(dto: LoginDto) {

    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new AppError(ErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED);
    }

    const isPasswordValid = await this.passwordHasher.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new AppError(ErrorMessages.INVALID_EMAIL_OR_PASSWORD, HttpStatusCode.UNAUTHORIZED);
    }

    if (
      dto.loginType === LoginType.ORGANIZATION && user.role !== UserRole.ORG_ADMIN
    ) {
      throw new AppError("Please login through the User Login page.", HttpStatusCode.FORBIDDEN);
    }

    if (
      dto.loginType === LoginType.USER && user.role === UserRole.ORG_ADMIN
    ) {
      throw new AppError("Please login through the Organization Login page.", HttpStatusCode.FORBIDDEN);
    }

    const payload = {
      userId: user.id!,
      organizationId: user.organizationId!,
      role: user.role,
    };

    const accessToken = await this.tokenService.generateAccessToken(payload);

    const refreshToken = await this.tokenService.generateRefreshToken(payload);

    await this.tokenStore.saveRefreshToken(user.id!, refreshToken);

    return {
      user: {
        id: user.id!,
        name: user.name,
        email: user.email,
        organizationId: user.organizationId!,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }
}