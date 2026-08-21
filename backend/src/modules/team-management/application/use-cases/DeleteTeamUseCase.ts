import { ErrorMessages } from "@/shared/constant/ErrorMessages";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { AppError } from "@/shared/errors/AppError";
import { IDeleteTeamUseCase } from "../../domain/interfaces/use-case/IDeleteTeamUseCase";
import { ITeamRepository } from "../../domain/interfaces/ITeamRepository";

export class DeleteTeamUseCase implements IDeleteTeamUseCase{
    constructor(
        private readonly teamRepository:ITeamRepository
    ){}

    async execute(id: string): Promise<void> {
        const team=await this.teamRepository.findById(id);

        if(!team){
            throw new AppError(ErrorMessages.TEAM_NOT_FOUND,HttpStatusCode.NOT_FOUND);
        }

        await this.teamRepository.delete(id);
    }
}