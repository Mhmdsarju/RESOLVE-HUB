import { inject,injectable } from "inversify";

import { TYPES } from "@/config/types";
import { IGetTeamMembersUseCase } from "../../domain/interfaces/use-case/IGetTeamMembersUseCase";
import { ITeamMemberRepository } from "../../domain/interfaces/ITeamMemberRepository";
import { TeamMember } from "../../domain/entities/teamMember.entity";

@injectable()
export class GetTeamMembersUseCase implements IGetTeamMembersUseCase{
    constructor(
        @inject(TYPES.TeamMemberRepository)
        private readonly teamMemberRepository:ITeamMemberRepository,
    ){}

    async execute(teamId: string): Promise<TeamMember[]> {
        return this.teamMemberRepository.findMembers(teamId);
    }
}