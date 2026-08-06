import { injectable, inject } from "inversify";
import { IGetTeamsUseCase } from "../../domain/interfaces/use-case/IGetTeamsUseCase";
import { ITeamRepository } from "../../domain/interfaces/ITeamRepository";
import { TYPES } from "@/config/types";
import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";
import { Team } from "../../domain/entities/team.entity";
import { GetTeamsDto } from "../dto/getTeamsDto";

@injectable()
export class GetTeamsUseCase implements IGetTeamsUseCase {
    constructor(
        @inject(TYPES.TeamRepository)
        private readonly teamRepository: ITeamRepository
    ) { }

    async execute(dto: GetTeamsDto): Promise<PaginationResult<Team>> {
        return this.teamRepository.findTeams(dto)
    }
}