import { ITokenService } from "../../domain/interfaces/ITokenService";
import { ITokenStore } from "../../domain/interfaces/ITokenStore";
import { IRefreshUseCase } from "../../domain/interfaces/use-cases/IRefreshUseCase";
import { RefreshDto } from "../dto/RefreshDto";
import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { ErrorMessages } from "../../../../shared/constant/ErrorMessages";

export class RefreshUseCase implements IRefreshUseCase {
  constructor(
    private readonly tokenService: ITokenService,
    private readonly tokenStore: ITokenStore,
  ) { }

  async execute(dto: RefreshDto) {

    const payload = await this.tokenService.verifyRefreshToken(dto.refreshToken);

    const storedRefreshToken = await this.tokenStore.getRefreshToken(payload.userId);

    if (!storedRefreshToken || storedRefreshToken !== dto.refreshToken) {
      throw new AppError(ErrorMessages.INVALID_REFRESH_TOKEN,HttpStatusCode.UNAUTHORIZED);
    }

    const tokenPayload = {
      userId: payload.userId,
      organizationId: payload.organizationId,
      role: payload.role,
    };

    const newAccessToken = await this.tokenService.generateAccessToken(tokenPayload);

    const newRefreshToken = await this.tokenService.generateRefreshToken(tokenPayload);

    await this.tokenStore.saveRefreshToken(payload.userId, newRefreshToken);


    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}