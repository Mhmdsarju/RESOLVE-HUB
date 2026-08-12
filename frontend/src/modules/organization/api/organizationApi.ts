import { api } from "@/core/api/axios";

import type { Organization, UpdateOrganizationDto, } from "../types/organization.types";

import type { ApiResponse } from "@/core/types/api.types";

export async function getOrganization() {
  const response = await api.get<ApiResponse<Organization>>(
    "/organizations/me",
  );

  return response.data.data;
}

export async function updateOrganization(dto: UpdateOrganizationDto,) {
  const response = await api.put<ApiResponse<Organization>>(
    "/organizations/me",
    dto,
  );

  return response.data.data;
}