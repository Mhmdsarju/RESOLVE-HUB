import { injectable,inject } from "inversify";

import { ICreateTeamUseCase } from "../../domain/interfaces/use-case/ICreateTeamUseCase";
import { ITeamRepository } from "../../domain/interfaces/ITeamRepository";
import { Team } from "../../domain/entities/team.entity";
import { CreateTeamDto } from "../dto/createTeamDto";
import { AppError } from "@/shared/errors/AppError";
import { TYPES } from "@/config/types";

@injectable()
export class CreateTeamUseCase implements ICreateTeamUseCase{
    constructor(
        @inject(TYPES.TeamRepository)
        private readonly teamRepository:ITeamRepository
    ){}

    async execute(dto: CreateTeamDto): Promise<Team> {
        
        const existingTeam=await this.teamRepository.findByName(
            dto.organizationId,dto.name
        );

        if(existingTeam){
            throw new AppError("Team already exists",409)
        }

        const team= new Team({
            organizationId:dto.organizationId,
            createdBy:dto.createdBy,
            name:dto.name
        })

        return await this.teamRepository.create(team);

    }

}