import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { resolveAlert } from "../api/alertApi";

import type { Alert, ResolveAlertVariables } from "../types/alert.types";
import type { ErrorResponse } from "@/core/types/error.types";

export function useResolveAlert() {
  const queryClient = useQueryClient();

  return useMutation<Alert, AxiosError<ErrorResponse>, ResolveAlertVariables>({
    mutationFn: ({ id }) => resolveAlert(id),

    onSuccess: (data, variables) => {
      queryClient.setQueryData(["alert", data.id], data,);

      queryClient.invalidateQueries({
        queryKey: ["alerts", variables.projectId],
      });

      toast.success("Alert resolved successfully");
    },

    onError: (error) => {
      const message = error.response?.data?.message ?? "Failed to resolve alert";
      toast.error(message);
    },
  });
}