import { inject,injectable } from "inversify";
import { TYPES } from "@/config/types";
import { AppError } from "@/shared/errors/AppError";
// import { ErrorMessages } from "@/shared/constant/ErrorMessages";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { TeamMember } from "../../domain/entities/teamMember.entity";

import { ITeamMemberRepository } from "../../domain/interfaces/ITeamMemberRepository";
import { IUpdateTeamMemberRoleUseCase } from "../../domain/interfaces/use-case/IUpdateTeamMemberRoleUseCase";
import { UpdateTeamMembersRoleDto } from "../dto/updateTeamMemberRoleDto";

@injectable()
export class UpdateTeamMemberRoleUseCase implements IUpdateTeamMemberRoleUseCase{
    constructor(
        @inject(TYPES.TeamMemberRepository)
        private readonly teamMemberRepository:ITeamMemberRepository
    ){}

    async execute(memberId: string, dto: UpdateTeamMembersRoleDto): Promise<TeamMember> {
        const member= await this.teamMemberRepository.findById(memberId);

        if(!member){
            throw new AppError("Member Not Found",HttpStatusCode.NOT_FOUND)
        }

        return this.teamMemberRepository.update(memberId,{role:dto.role})
    }
}