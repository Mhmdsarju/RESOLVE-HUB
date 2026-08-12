import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";

import { IGetTeamMembersUseCase } from "../../domain/interfaces/use-case/IGetTeamMembersUseCase";
import {
    ITeamMemberRepository,
} from "../../domain/interfaces/ITeamMemberRepository";

import { PaginationDto } from "@/shared/utils/Pagination/PaginationDto";
import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";

import { TeamMemberWithUser, } from "../../domain/interfaces/ITeamMemberRepository";


@injectable()
export class GetTeamMembersUseCase implements IGetTeamMembersUseCase {
    constructor(
        @inject(TYPES.TeamMemberRepository)
        private readonly teamMemberRepository: ITeamMemberRepository,
    ) { }


    async execute(teamId: string, pagination: PaginationDto,): Promise<PaginationResult<TeamMemberWithUser>> {
        return this.teamMemberRepository.findMembers(teamId, pagination,);
    }
}