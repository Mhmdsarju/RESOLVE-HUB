import type { UserRole } from "@/modules/auth/types/user-role";


export type TeamRole = "MEMBER" | "LEAD";


export type InvitationStatus = "PENDING" | "ACCEPTED" | "EXPIRED" | "CANCELLED";


export interface TeamInvitation {
  id: string;
  organizationId: string;
  teamId: string;
  invitedEmail: string;
  role: TeamRole;
  status: InvitationStatus;
  expiresAt: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}


export interface CreateTeamInvitationDto {
  invitedEmail: string;
  role: TeamRole;
}


export interface AcceptTeamInvitationDto {
  name: string;
  password: string;
}


export interface AcceptTeamInvitationResponse {
  user: {
    id: string;
    name: string;
    email: string;
    organizationId: string;
    role: UserRole;
  };
  accessToken: string;
}