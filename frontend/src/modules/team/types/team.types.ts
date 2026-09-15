export interface Team {
  id: string;
  organizationId: string;
  createdBy: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface CreateTeamDto {
  name: string;
}

export interface UpdateTeamDto {
  name: string;
}

export interface GetTeamsParams {
  page?: number;
  limit?: number;
  search?: string;
}