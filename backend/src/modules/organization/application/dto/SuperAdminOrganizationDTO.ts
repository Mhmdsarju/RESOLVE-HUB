export interface SuperAdminOrganizationsDTO {
  organizations: {
    id: string;
    name: string;
    industry: string | null;
    companySize: string | null;
    country: string | null;
    state: string | null;
    city: string | null;
    status: string;
    accessStatus: string;
    createdAt: Date;
  }[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}