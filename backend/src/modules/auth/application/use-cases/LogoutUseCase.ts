import { ITokenService } from "../../domain/interfaces/ITokenService";
import { ITokenStore } from "../../domain/interfaces/ITokenStore";
import { ILogoutUsecase } from "../../domain/interfaces/use-cases/ILogoutUseCase";
import { LogoutDto } from "../dto/LogoutDto";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { ICreateAuditLogUseCase } from "@/modules/audit-log/domain/interface/usecase/ICreateAuditLogUseCase";
import { AuditAction, AuditEntityType } from "@/modules/audit-log/domain/enums/auditLog.enum";

export class LogoutUseCase implements ILogoutUsecase{
    constructor(
        private readonly tokenService: ITokenService,
        private readonly tokenStore: ITokenStore,
        private readonly userRepository: IUserRepository,
        private readonly createAuditLogUseCase: ICreateAuditLogUseCase,
    ) { }

    async execute(dto:LogoutDto): Promise<void> {
        
        const payload = await this.tokenService.verifyRefreshToken(dto.refreshToken);

        await this.tokenStore.deleteRefreshToken(payload.userId);

        const user = await this.userRepository.findById(payload.userId);

        if (user?.organizationId) {
            await this.createAuditLogUseCase.execute({
                organizationId: user.organizationId,
                action: AuditAction.LOGOUT,
                entityType: AuditEntityType.AUTH,
                description: `${user.name} logged out`,
                actorId: user.id,
            });
        }

    }
}