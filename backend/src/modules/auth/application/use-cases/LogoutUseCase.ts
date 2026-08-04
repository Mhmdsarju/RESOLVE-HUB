import { inject, injectable } from "inversify";
import { ITokenService } from "../../domain/interfaces/ITokenService";
import { ITokenStore } from "../../domain/interfaces/ITokenStore";
import { TYPES } from "../../../../config/types";
import { ILogoutUsecase } from "../../domain/interfaces/use-cases/ILogoutUseCase";
import { LogoutDto } from "../dto/LogoutDto";

@injectable()
export class LogoutUseCase implements ILogoutUsecase{
    constructor(
        @inject(TYPES.TokenService)
        private readonly tokenService: ITokenService,
        @inject(TYPES.TokenStore)
        private readonly tokenStore: ITokenStore
    ) { }

    async execute(dto:LogoutDto): Promise<void> {
        
        const payload = await this.tokenService.verifyRefreshToken(dto.refreshToken);

        await this.tokenStore.deleteRefreshToken(payload.userId);

    }
}