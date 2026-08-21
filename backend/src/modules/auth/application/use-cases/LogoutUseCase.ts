import { ITokenService } from "../../domain/interfaces/ITokenService";
import { ITokenStore } from "../../domain/interfaces/ITokenStore";
import { ILogoutUsecase } from "../../domain/interfaces/use-cases/ILogoutUseCase";
import { LogoutDto } from "../dto/LogoutDto";

export class LogoutUseCase implements ILogoutUsecase{
    constructor(
        private readonly tokenService: ITokenService,
        private readonly tokenStore: ITokenStore
    ) { }

    async execute(dto:LogoutDto): Promise<void> {
        
        const payload = await this.tokenService.verifyRefreshToken(dto.refreshToken);

        await this.tokenStore.deleteRefreshToken(payload.userId);

    }
}