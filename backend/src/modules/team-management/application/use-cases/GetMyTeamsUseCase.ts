import { TYPES } from "@/config/types";
import { inject, injectable } from "inversify";
import { ITeamMemberRepository } from "../../domain/interfaces/ITeamMemberRepository";
import { IGetMyTeamsUseCase } from "../../domain/interfaces/use-case/IGetMyTeamsUseCase";
import { GetMyTeamsResponseDto } from "../dto/getMyTeamsResponseDto";

@injectable()
export class GetMyTeamsUseCase implements IGetMyTeamsUseCase {
    constructor(
        @inject(TYPES.TeamMemberRepository)
        private readonly teamMemberRepository: ITeamMemberRepository
    ) { }

    async execute(userId: string): Promise<GetMyTeamsResponseDto[]> {
        const members = await this.teamMemberRepository.findTeamsByUserId(userId);

        return members.map((m) => ({
            teamId: m.team.id,
            teamName: m.team.name,
            role: m.role,
        }));
    }
}