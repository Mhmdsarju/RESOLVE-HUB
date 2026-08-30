import { AppError } from "@/shared/errors/AppError";
import { ErrorMessages } from "@/shared/constant/ErrorMessages";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { IUserRepository } from "@/modules/auth/domain/repositories/IUserRepository";

import { TeamMember } from "../../domain/entities/teamMember.entity";
import { TeamRole } from "../../domain/enums/TeamRole";

import { CreateTeamMemberDto } from "../dto/createTeamMemberDto";

import { ITeamRepository } from "../../domain/interfaces/ITeamRepository";
import { ITeamMemberRepository } from "../../domain/interfaces/ITeamMemberRepository";
import { IAddTeamMemberUseCase } from "../../domain/interfaces/use-case/IAddTeamMemberUseCase";
import { ICreateAuditLogUseCase } from "@/modules/audit-log/domain/interface/usecase/ICreateAuditLogUseCase";
import { AuditAction, AuditEntityType } from "@/modules/audit-log/domain/enums/auditLog.enum";
import { ICreateNotificationUseCase } from "@/modules/notification/domain/interface/use-case/ICreateNotificationUseCase";
import { NotificationType } from "@/modules/notification/domain/enums/NotificationType"; 

export class AddTeamMemberUseCase implements IAddTeamMemberUseCase {
    constructor(
        private readonly teamRepository: ITeamRepository,
        private readonly teamMemberRepository: ITeamMemberRepository,
        private readonly userRepository: IUserRepository,
        private readonly createAuditLogUseCase: ICreateAuditLogUseCase,
        private readonly createNotificationUseCase: ICreateNotificationUseCase,
    ) { }

    async execute(dto: CreateTeamMemberDto, actorId: string,): Promise<TeamMember> {

        const team = await this.teamRepository.findById(dto.teamId);

        if (!team) {
            throw new AppError(ErrorMessages.TEAM_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }

        const user = await this.userRepository.findById(dto.userId);

        if (!user) {
            throw new AppError(ErrorMessages.USER_NOT_FOUND, HttpStatusCode.NOT_FOUND);
        }

        if (user.organizationId !== team.organizationId) {
            throw new AppError(ErrorMessages.USER_NOT_IN_ORGANIZATION, HttpStatusCode.FORBIDDEN);
        }

        const existingMember = await this.teamMemberRepository.findMember(
            dto.teamId,
            dto.userId
        );

        if (existingMember) {
            throw new AppError("Member Already Exists", HttpStatusCode.CONFLICT);
        }

        const teamMember = new TeamMember({
            teamId: dto.teamId,
            userId: dto.userId,
            role: dto.role ?? TeamRole.MEMBER,
        });

        const createdMember = await this.teamMemberRepository.create(teamMember);

        await this.createAuditLogUseCase.execute({
            organizationId: team.organizationId,
            action: AuditAction.USER_ADDED_TO_TEAM,
            entityType: AuditEntityType.USER,
            entityId: user.id,
            description: `User ${user.name} was added to team ${team.name}`,
            actorId,
            metadata: {
                teamId: team.id,
                teamName: team.name,
                role: dto.role ?? TeamRole.MEMBER,
            },
        });

        await this.createNotificationUseCase.execute({
            userId: user.id!,
            type: NotificationType.SYSTEM,
            title: "Added to Team",
            message: `You were added to ${team.name}.`,
        });

        return createdMember;
    }
}