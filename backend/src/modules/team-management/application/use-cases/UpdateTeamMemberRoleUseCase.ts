import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { TeamMember } from "../../domain/entities/teamMember.entity";

import { IUserRepository } from "@/modules/auth/domain/repositories/IUserRepository";

import { ITeamMemberRepository } from "../../domain/interfaces/ITeamMemberRepository";
import { ITeamRepository } from "../../domain/interfaces/ITeamRepository";
import { IUpdateTeamMemberRoleUseCase } from "../../domain/interfaces/use-case/IUpdateTeamMemberRoleUseCase";
import { UpdateTeamMembersRoleDto } from "../dto/updateTeamMemberRoleDto";

import { ICreateAuditLogUseCase } from "@/modules/audit-log/domain/interface/usecase/ICreateAuditLogUseCase";
import { AuditAction, AuditEntityType } from "@/modules/audit-log/domain/enums/auditLog.enum";

export class UpdateTeamMemberRoleUseCase implements IUpdateTeamMemberRoleUseCase {
    constructor(
        private readonly teamMemberRepository: ITeamMemberRepository,
        private readonly teamRepository: ITeamRepository,
        private readonly userRepository: IUserRepository,
        private readonly createAuditLogUseCase: ICreateAuditLogUseCase,
    ) { }

    async execute(memberId: string, dto: UpdateTeamMembersRoleDto, actorId: string,): Promise<TeamMember> {

        const member = await this.teamMemberRepository.findById(memberId);

        if (!member) {
            throw new AppError("Member Not Found", HttpStatusCode.NOT_FOUND)
        }

        const team = await this.teamRepository.findById(member.teamId);

        if (!team) {
            throw new AppError("Team not found", HttpStatusCode.NOT_FOUND);
        }

        const user = await this.userRepository.findById(member.userId);

        if (!user) {
            throw new AppError("User not found", HttpStatusCode.NOT_FOUND);
        }

        const oldRole = member.role;

        const updatedMember = await this.teamMemberRepository.update(
            memberId,
            {
                role: dto.role,
            },
        );

        await this.createAuditLogUseCase.execute({
            organizationId: team.organizationId,
            action: AuditAction.ROLE_CHANGED,
            entityType: AuditEntityType.USER,
            entityId: member.userId,
            description: `${user.name}'s role changed from ${oldRole} to ${dto.role}`,
            actorId,
            metadata: {
                oldRole,
                newRole: dto.role,
                teamId: member.teamId,
            },
        });

        return updatedMember;
    }
}