import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteAlertRule } from "../api/alertRuleApi";

import type { ErrorResponse } from "@/core/types/error.types";

import type { DeleteAlertRuleVariables } from "../types/alertRule.types";



export function useDeleteAlertRule() {
  const queryClient = useQueryClient();

  return useMutation<null, AxiosError<ErrorResponse>, DeleteAlertRuleVariables>({
    mutationFn: ({ id }) => deleteAlertRule(id),

    onSuccess: (_, variables) => {
      queryClient.removeQueries({
        queryKey: ["alert-rule", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["alert-rules", variables.projectId],
      });

      toast.success("Alert rule deleted successfully");
    },

    onError: (error) => {
      const message = error.response?.data?.message ?? "Failed to delete alert rule";
      toast.error(message);
    },
  });
}