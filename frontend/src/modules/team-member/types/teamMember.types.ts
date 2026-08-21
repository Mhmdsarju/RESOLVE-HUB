import type { PaginationMeta } from "@/core/types/pagination.types";


export type TeamRole = "MEMBER" | "LEAD";


export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  name: string;
  email: string;
  role: TeamRole;
  createdAt: string;
  updatedAt: string;
}


export interface GetTeamMembersParams {
  page?: number;
  limit?: number;
  search?: string;
}


export interface GetTeamMembersResponse {
  items: TeamMember[];
  pagination: PaginationMeta;
}


export interface UpdateTeamMemberRoleDto {
  role: TeamRole;
}