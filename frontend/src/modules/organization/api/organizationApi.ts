import { api } from "@/core/api/axios";

import type {  Organization,  UpdateOrganizationDto,} from "../types/organization.types";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function getOrganization() {
  const response = await api.get<ApiResponse<Organization>>(
    "/organizations/me",
  );

  return response.data.data;
}

export async function updateOrganization(
  dto: UpdateOrganizationDto,
) {
  const response = await api.put<ApiResponse<Organization>>(
    "/organizations/me",
    dto,
  );

  return response.data.data;
}