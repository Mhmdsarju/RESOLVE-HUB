import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { IRemoveTeamMemberUseCase } from "../../domain/interfaces/use-case/IRemoveTeamMemberUseCase";
import { ITeamMemberRepository } from "../../domain/interfaces/ITeamMemberRepository";
import { ITeamRepository } from "../../domain/interfaces/ITeamRepository";
import { IUserRepository } from "@/modules/auth/domain/repositories/IUserRepository";
import { ICreateAuditLogUseCase } from "@/modules/audit-log/domain/interface/usecase/ICreateAuditLogUseCase";
import { AuditAction, AuditEntityType } from "@/modules/audit-log/domain/enums/auditLog.enum";
import { ICreateNotificationUseCase } from "@/modules/notification/domain/interface/use-case/ICreateNotificationUseCase";
import { NotificationType } from "@/modules/notification/domain/enums/NotificationType"; 

export class RemoveTeamMemberUseCase implements IRemoveTeamMemberUseCase {
    constructor(
        private readonly teamMemberRepository: ITeamMemberRepository,
        private readonly teamRepository: ITeamRepository,
        private readonly userRepository: IUserRepository,
        private readonly createAuditLogUseCase: ICreateAuditLogUseCase,
        private readonly createNotificationUseCase: ICreateNotificationUseCase,
    ) { }

    async execute(memberId: string, actorId: string,): Promise<void> {

        const member = await this.teamMemberRepository.findById(memberId);

        if (!member) {
            throw new AppError("Member not Found", HttpStatusCode.NOT_FOUND);
        }

        const team = await this.teamRepository.findById(member.teamId);

        if (!team) {
            throw new AppError("Team not found", HttpStatusCode.NOT_FOUND);
        }

        const user = await this.userRepository.findById(member.userId);

        if (!user) {
            throw new AppError("User not found", HttpStatusCode.NOT_FOUND);
        }

        await this.createNotificationUseCase.execute({
            userId: user.id!,
            type: NotificationType.SYSTEM,
            title: "Removed from Team",
            message: `You were removed from ${team.name}.`,
        });

        await this.teamMemberRepository.delete(memberId);

        await this.createAuditLogUseCase.execute({
            organizationId: team.organizationId,
            action: AuditAction.USER_REMOVED_FROM_TEAM,
            entityType: AuditEntityType.USER,
            entityId: user.id,
            description: `User ${user.name} was removed from team ${team.name}`,
            actorId,
            metadata: {
                teamId: team.id,
                teamName: team.name,
                role: member.role,
            },
        });
    }
}