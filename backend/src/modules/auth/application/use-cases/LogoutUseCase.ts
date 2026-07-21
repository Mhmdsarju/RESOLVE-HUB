import { ITokenService } from "../../domain/interfaces/ITokenService";
import { ITokenStore } from "../../domain/interfaces/ITokenStore";

export class LogoutUseCase {
    constructor(
        private readonly tokenService: ITokenService,
        private readonly tokenStore: ITokenStore
    ) { }

    async execute(refreshToken: string): Promise<void> {
        // 1. Verify Refresh Token
        const payload = await this.tokenService.verifyRefreshToken(refreshToken);

        // 2. Delete Refresh Token from Redis
        await this.tokenStore.deleteRefreshToken(payload.userId);
    }
}