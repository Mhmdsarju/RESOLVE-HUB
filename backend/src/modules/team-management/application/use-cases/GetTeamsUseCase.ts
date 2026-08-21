import { IGetTeamsUseCase } from "../../domain/interfaces/use-case/IGetTeamsUseCase";
import { ITeamRepository } from "../../domain/interfaces/ITeamRepository";
import { PaginationResult } from "@/shared/utils/Pagination/PaginationResult";
import { Team } from "../../domain/entities/team.entity";
import { GetTeamsDto } from "../dto/getTeamsDto";

export class GetTeamsUseCase implements IGetTeamsUseCase {
    constructor(
        private readonly teamRepository: ITeamRepository
    ) { }

    async execute(dto: GetTeamsDto): Promise<PaginationResult<Team>> {
        return this.teamRepository.findTeams(dto)
    }
}