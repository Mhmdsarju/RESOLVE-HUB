import { TeamRole } from "../../domain/enums/TeamRole";

export interface CreateTeamMemberDto {
    teamId: string;
    userId: string;
    role: TeamRole;
}