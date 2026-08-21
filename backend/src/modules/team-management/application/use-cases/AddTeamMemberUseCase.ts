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

export class AddTeamMemberUseCase implements IAddTeamMemberUseCase {
    constructor(
        private readonly teamRepository: ITeamRepository,
        private readonly teamMemberRepository: ITeamMemberRepository,
        private readonly userRepository: IUserRepository,
    ) { }

    async execute(dto: CreateTeamMemberDto): Promise<TeamMember> {

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

        return this.teamMemberRepository.create(teamMember);
    }
}