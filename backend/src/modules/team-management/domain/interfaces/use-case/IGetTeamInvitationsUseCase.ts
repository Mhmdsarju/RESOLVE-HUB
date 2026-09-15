import { TeamInvitation } from "../../entities/teamInvitation.entity";

export interface IGetTeamInvitationsUseCase {
    execute(teamId: string): Promise<TeamInvitation[]>;
}