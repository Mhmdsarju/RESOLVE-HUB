import { api } from "@/core/api/axios";

import type {
  Organization,
  OrganizationVerification,
  UpdateOrganizationDto,
  PendingOrganizationVerification,
  OrganizationVerificationDetails,
  OrganizationDashboardStats,
  RevenueAnalyticsDTO,
  SuperAdminOrganizationsDTO,
  PaymentHistoryDTO,
  SuperAdminDashboardDTO,
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

export async function getOrganizationDashboardStats() {
  const response = await api.get<ApiResponse<OrganizationDashboardStats>>(
    "/organizations/dashboard",
  );

  return response.data.data;
}

export async function getOrganizationAnalytics() {
  const response = await api.get<
    ApiResponse<{
      totalOrganizations: number;
      activeOrganizations: number;
      frozenOrganizations: number;
    }>
  >("/admin/organizations/analytics");

  return response.data.data;
}

export async function getSuperAdminOrganizations(params: {
  page: number;
  limit: number;
  search?: string;
  status?: string;
}) {
  const response = await api.get<ApiResponse<SuperAdminOrganizationsDTO>>(
    "/admin/organizations",
    {
      params,
    }
  );

  return response.data.data;
}

export async function getRevenueAnalytics() {
  const response = await api.get<ApiResponse<RevenueAnalyticsDTO>>(
    "/admin/organizations/revenue-analytics"
  );

  return response.data.data;
}

export async function getPaymentHistory(params: {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  period?: "MONTHLY" | "YEARLY" | "CUSTOM";
  year?: number;
  month?: number;
  startDate?: string;
  endDate?: string;
}) {
  const response = await api.get<ApiResponse<PaymentHistoryDTO>>(
    "/admin/organizations/payment-history",
    {
      params,
    },
  );

  return response.data.data;
}

export async function exportPaymentReport(params?: {
  period?: "MONTHLY" | "YEARLY" | "CUSTOM";
  year?: number;
  month?: number;
  startDate?: string;
  endDate?: string;
}) {
  const response = await api.get(
    "/admin/organizations/payment-history/export",
    {
      params,
      responseType: "blob",
    },
  );

  return response.data;
}

export async function getSuperAdminDashboard() {
  const response = await api.get<ApiResponse<SuperAdminDashboardDTO>>(
    "/admin/organizations/dashboard"
  );

  return response.data.data;
}