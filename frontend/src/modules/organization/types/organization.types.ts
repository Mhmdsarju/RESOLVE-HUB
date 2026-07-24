export interface Organization {
  id: string;
  name: string;
  industry: string | null;
  companySize: string | null;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}

export interface UpdateOrganizationDto {
  name: string;
  industry: string;
  companySize: string;
}