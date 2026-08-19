import { api } from "@/core/api/axios";

import type {
  Organization,
  OrganizationVerification,
  UpdateOrganizationDto,
  PendingOrganizationVerification,
  OrganizationVerificationDetails,
} from "../types/organization.types";

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

export async function submitOrganizationVerification() {
  const response = await api.post<ApiResponse<Organization>>(
    "/organizations/me/submit-verification",
  );

  return response.data.data;
}

export async function getOrganizationVerification() {
  const response = await api.get<ApiResponse<OrganizationVerification>>(
    "/organizations/me/verification",
  );

  return response.data.data;
}

export async function getPendingOrganizationVerifications() {
  const response = await api.get<ApiResponse<PendingOrganizationVerification[]>>
    ("/admin/organizations/pending-verification");

  return response.data.data;
}

export async function getOrganizationVerificationDetails(organizationId: string,) {
  const response = await api.get<ApiResponse<OrganizationVerificationDetails>>(
    `/admin/organizations/${organizationId}/verification`,
  );

  return response.data.data;
}

export async function approveOrganizationVerification(organizationId: string,) {
  const response = await api.post<ApiResponse<Organization>>(
    `/admin/organizations/${organizationId}/approve`,
  );

  return response.data.data;
}

export async function rejectOrganizationVerification(organizationId: string, reason: string,) {
  const response = await api.post<ApiResponse<Organization>>(
    `/admin/organizations/${organizationId}/reject`,
    { reason },
  );

  return response.data.data;
}