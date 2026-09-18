import { useMutation } from "@tanstack/react-query";

import { exportPaymentReport } from "../api/organizationApi";

export function useExportPaymentReport() {
  return useMutation({
    mutationFn: (params?: {
      period?: "MONTHLY" | "YEARLY" | "CUSTOM";
      year?: number;
      month?: number;
      startDate?: string;
      endDate?: string;
    }) => exportPaymentReport(params),
  });
}