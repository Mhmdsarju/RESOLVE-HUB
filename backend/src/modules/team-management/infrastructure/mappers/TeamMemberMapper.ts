import { TeamMember as PrismaTeamMember, TeamRole as PrismaTeamRole, } from "@prisma/client";

import { TeamMember } from "../../domain/entities/teamMember.entity";
import { TeamRole } from "../../domain/enums/TeamRole";

export class TeamMemberMapper {
    static fromDb(teamMember: PrismaTeamMember): TeamMember {
        return new TeamMember({
            id: teamMember.id,
            teamId: teamMember.teamId,
            userId: teamMember.userId,
            role:
                teamMember.role === PrismaTeamRole.LEAD
                    ? TeamRole.LEAD
                    : TeamRole.MEMBER,
            createdAt: teamMember.createdAt,
            updatedAt: teamMember.updatedAt,
        });
    }

    static toDb(teamMember: TeamMember) {
        return {
            teamId: teamMember.teamId,
            userId: teamMember.userId,
            role:
                teamMember.role === TeamRole.LEAD
                    ? PrismaTeamRole.LEAD
                    : PrismaTeamRole.MEMBER,
        };
    }
}