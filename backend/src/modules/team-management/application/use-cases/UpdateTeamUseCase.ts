import { inject, injectable } from "inversify";
import { TYPES } from "@/config/types";
import { AppError } from "@/shared/errors/AppError";
import { ErrorMessages } from "@/shared/constant/ErrorMessages";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { Team } from "../../domain/entities/team.entity";
import { ITeamRepository } from "../../domain/interfaces/ITeamRepository";
import { IUpdateTeamUseCase } from "../../domain/interfaces/use-case/IUpdateTeamUseCase";
import { UpdateTeamDto } from "../dto/updateTeamDto";

@injectable()
export class UpdateTeamUseCase implements IUpdateTeamUseCase {
    constructor(
        @inject(TYPES.TeamRepository)
        private readonly teamRepository: ITeamRepository
    ) { }

    async execute(id: string, dto: UpdateTeamDto): Promise<Team> {

        const team = await this.teamRepository.findById(id);

        if (!team) {
            throw new AppError(ErrorMessages.TEAM_NOT_FOUND, HttpStatusCode.NOT_FOUND)
        }

        const existingTeam = await this.teamRepository.findByName(
            team.organizationId, dto.name
        );

        if (existingTeam && existingTeam.id !== team.id) {
            throw new AppError("team already exists", HttpStatusCode.CONFLICT)
        }

        team.name = dto.name;

        return this.teamRepository.update(id, team);

    }

}