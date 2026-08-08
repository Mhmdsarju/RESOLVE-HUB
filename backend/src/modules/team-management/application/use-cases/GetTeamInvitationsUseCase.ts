import { inject,injectable } from "inversify";

import { TYPES } from "@/config/types";

import { IGetTeamInvitationsUseCase } from "../../domain/interfaces/use-case/IGetTeamInvitationsUseCase";
import { ITeamInvitationRepository } from "../../domain/interfaces/ITeamInvitationRepository";

import { TeamInvitation } from "../../domain/entities/teamInvitation.entity";

@injectable()
export class GetTeamInvitationUseCase implements IGetTeamInvitationsUseCase{
    constructor(
        @inject(TYPES.TeamInvitationRepository)
        private readonly invitationRepository:ITeamInvitationRepository,
    ){}

    async execute(teamId: string): Promise<TeamInvitation[]> {
        return this.invitationRepository.findByTeamId(teamId);
    }

}