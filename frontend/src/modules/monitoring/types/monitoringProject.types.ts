export interface MonitoringProject {
  id: string;
  name: string;
  description: string | null;
  organizationId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}


export interface CreateMonitoringProjectDto {
  name: string;
  description?: string;
}


export interface UpdateMonitoringProjectDto {
  name?: string;
  description?: string;
}


export interface GetMonitoringProjectsParams {
  page?: number;
  limit?: number;
}


export interface GetMonitoringProjectsResponse {
  data: MonitoringProject[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}