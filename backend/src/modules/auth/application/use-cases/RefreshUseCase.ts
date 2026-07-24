import { ITokenService } from "../../domain/interfaces/ITokenService";
import { ITokenStore } from "../../domain/interfaces/ITokenStore";

export class RefreshUseCase {
  constructor(
    private readonly tokenService: ITokenService,
    private readonly tokenStore: ITokenStore
  ) {}

  async execute(refreshToken: string) {
    // 1. Verify Refresh Token
    const payload =
      await this.tokenService.verifyRefreshToken(
        refreshToken
      );

    // 2. Get Token from Redis
    const storedRefreshToken =
      await this.tokenStore.getRefreshToken(
        payload.userId
      );

    // 3. Validate Token
    if (
      !storedRefreshToken ||
      storedRefreshToken !== refreshToken
    ) {
      throw new Error("Invalid refresh token");
    }

    // 4. Create Fresh Payload
    const tokenPayload = {
      userId: payload.userId,
      organizationId: payload.organizationId,
      role: payload.role,
    };

    // 5. Generate New Tokens
    const newAccessToken =
      await this.tokenService.generateAccessToken(
        tokenPayload
      );

    const newRefreshToken =
      await this.tokenService.generateRefreshToken(
        tokenPayload
      );

    // 6. Update Redis
    await this.tokenStore.saveRefreshToken(
      payload.userId,
      newRefreshToken
    );

    // 7. Return
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}