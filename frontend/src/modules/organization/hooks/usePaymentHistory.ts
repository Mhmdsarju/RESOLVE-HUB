import { useQuery } from "@tanstack/react-query";

import { getPaymentHistory } from "../api/organizationApi";

export function usePaymentHistory(params: {
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
    queryKey: ["super-admin-payment-history", params],

    queryFn: () => getPaymentHistory(params),
  });
}