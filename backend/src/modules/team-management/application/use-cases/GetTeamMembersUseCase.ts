import { IGetTeamMembersUseCase } from "../../domain/interfaces/use-case/IGetTeamMembersUseCase";
import {    ITeamMemberRepository,} from "../../domain/interfaces/ITeamMemberRepository";

import { PaginationDto } from "@/shared/utils/Pagination/PaginationDto";
import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";

import { TeamMemberWithUser, } from "../../domain/interfaces/ITeamMemberRepository";

export class GetTeamMembersUseCase implements IGetTeamMembersUseCase {
    constructor(
        private readonly teamMemberRepository: ITeamMemberRepository,
    ) { }


    async execute(teamId: string, pagination: PaginationDto,): Promise<PaginationResult<TeamMemberWithUser>> {
        return this.teamMemberRepository.findMembers(teamId, pagination,);
    }
}