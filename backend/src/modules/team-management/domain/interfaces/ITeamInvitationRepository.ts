import { IBaseRepository } from "@/shared/base/repositories/IBaseRepository";

import { TeamInvitation } from "../entities/teamInvitation.entity";

export interface ITeamInvitationRepository extends IBaseRepository<TeamInvitation> {

    findByToken(token: string): Promise<TeamInvitation | null>;

    findPendingInvitation(teamId: string, invitedEmail: string): Promise<TeamInvitation | null>;

    findByTeamId(teamId: string): Promise<TeamInvitation[]>;
}