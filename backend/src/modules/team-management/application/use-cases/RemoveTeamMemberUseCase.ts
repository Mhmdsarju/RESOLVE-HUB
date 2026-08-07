import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";

import { AppError } from "@/shared/errors/AppError";

import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { IRemoveTeamMemberUseCase } from "../../domain/interfaces/use-case/IRemoveTeamMemberUseCase";
import { ITeamMemberRepository } from "../../domain/interfaces/ITeamMemberRepository";

@injectable()
export class RemoveTeamMemberUseCase
    implements IRemoveTeamMemberUseCase {

    constructor(
        @inject(TYPES.TeamMemberRepository)
        private readonly teamMemberRepository: ITeamMemberRepository
    ) {}

    async execute(memberId: string): Promise<void> {
        const member = await this.teamMemberRepository.findById(memberId);

        if (!member) {
            throw new AppError(
                "MEmber not Found",
                HttpStatusCode.NOT_FOUND
            );
        }

        await this.teamMemberRepository.delete(memberId);
    }
}