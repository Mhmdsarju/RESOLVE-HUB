import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { applyDefaultAlertRule } from "../api/alertRuleApi";

import type { AlertRule, ApplyDefaultAlertRuleVariables } from "../types/alertRule.types";

import type { ErrorResponse } from "@/core/types/error.types";


export function useApplyDefaultAlertRule() {
  const queryClient = useQueryClient();

  return useMutation<AlertRule, AxiosError<ErrorResponse>, ApplyDefaultAlertRuleVariables>({
    mutationFn: ({ projectId, data }) => applyDefaultAlertRule(projectId, data),

    onSuccess: (data, variables) => {
      queryClient.setQueryData(["alert-rule", data.id], data,);

      queryClient.invalidateQueries({
        queryKey: ["alert-rules", variables.projectId],
      });

      toast.success("Default alert rule applied successfully",);
    },

    onError: (error) => {
      const message = error.response?.data?.message ?? "Failed to apply default alert rule";
      toast.error(message);
    },
  });
}