import { TeamRole } from "../../domain/enums/TeamRole";

export interface CreateTeamInvitationDto {
    organizationId: string;
    teamId: string;
    invitedEmail: string;
    role: TeamRole;
    createdBy: string;
}