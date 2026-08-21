import { IGetTeamInvitationsUseCase } from "../../domain/interfaces/use-case/IGetTeamInvitationsUseCase";
import { ITeamInvitationRepository } from "../../domain/interfaces/ITeamInvitationRepository";

import { TeamInvitation } from "../../domain/entities/teamInvitation.entity";

export class GetTeamInvitationUseCase implements IGetTeamInvitationsUseCase{
    constructor(
        private readonly invitationRepository:ITeamInvitationRepository,
    ){}

    async execute(teamId: string): Promise<TeamInvitation[]> {
        return this.invitationRepository.findByTeamId(teamId);
    }

}