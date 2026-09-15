import { TeamInvitation as PrismaTeamInvitation, TeamRole as PrismaTeamRole, InvitationStatus as PrismaInvitationStatus, } from "@prisma/client";

import { TeamInvitation } from "../../domain/entities/teamInvitation.entity";
import { TeamRole } from "../../domain/enums/TeamRole";
import { InvitationStatus } from "../../domain/enums/InvitationStatus";

export class TeamInvitationMapper {
    static fromDb(invitation: PrismaTeamInvitation): TeamInvitation {
        return new TeamInvitation({
            id: invitation.id,
            organizationId: invitation.organizationId,
            teamId: invitation.teamId,
            invitedEmail: invitation.invitedEmail,
            role: invitation.role as TeamRole,
            token: invitation.token,
            status: invitation.status as InvitationStatus,
            expiresAt: invitation.expiresAt,
            createdBy: invitation.createdBy,
            createdAt: invitation.createdAt,
            updatedAt: invitation.updatedAt,
        });
    }

    static toDb(invitation: TeamInvitation) {
        return {
            organizationId: invitation.organizationId,
            teamId: invitation.teamId,
            invitedEmail: invitation.invitedEmail,
            role: invitation.role as PrismaTeamRole,
            token: invitation.token,
            status: invitation.status as PrismaInvitationStatus,
            expiresAt: invitation.expiresAt,
            createdBy: invitation.createdBy,
        };
    }
}