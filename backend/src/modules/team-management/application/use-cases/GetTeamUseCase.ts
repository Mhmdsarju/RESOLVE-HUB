import { inject, injectable } from "inversify";

import {TYPES} from "@/config/types";

import { Team } from "../../domain/entities/team.entity";
import { IGetTeamUseCase } from "../../domain/interfaces/use-case/IGetTeamUseCase";

import { AppError } from "@/shared/errors/AppError";
import { ErrorMessages } from "@/shared/constant/ErrorMessages";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { ITeamRepository } from "../../domain/interfaces/ITeamRepository";

@injectable()
export class GetTeamUseCase implements IGetTeamUseCase{
    constructor(
        @inject(TYPES.TeamRepository)
        private readonly teamRepository:ITeamRepository
    ) {}
    async execute(id: string): Promise<Team> {
        const team=await this.teamRepository.findById(id);

        if(!team){
            throw new AppError(ErrorMessages.TEAM_NOT_FOUND,HttpStatusCode.NOT_FOUND)
        }
        return team;
    }
}