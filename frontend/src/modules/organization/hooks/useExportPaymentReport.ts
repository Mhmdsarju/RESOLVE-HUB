import { useMutation } from "@tanstack/react-query";
import { exportPaymentReport } from "../api/organizationApi";

export function useExportPaymentReport() {
  return useMutation({
    mutationFn: exportPaymentReport,
  });
}