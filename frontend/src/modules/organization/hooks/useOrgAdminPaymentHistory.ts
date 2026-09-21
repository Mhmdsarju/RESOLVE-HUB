import { useQuery } from "@tanstack/react-query";
import { getOrgAdminPaymentHistory } from "../api/organizationApi";

export function useOrgAdminPaymentHistory(params: {
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
  return useQuery({
    queryKey: ["org-admin-payment-history", params],

    queryFn: () => getOrgAdminPaymentHistory(params),
  });
}