import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createAlertRule } from "../api/alertRuleApi";

import type { AlertRule, CreateAlertRuleVariables } from "../types/alertRule.types";

import type { ErrorResponse } from "@/core/types/error.types";


export function useCreateAlertRule() {
  const queryClient = useQueryClient();

  return useMutation<AlertRule, AxiosError<ErrorResponse>, CreateAlertRuleVariables>({
    mutationFn: ({ projectId, data }) => createAlertRule(projectId, data),

    onSuccess: (data, variables) => {
      queryClient.setQueryData(["alert-rule", data.id], data,);

      queryClient.invalidateQueries({
        queryKey: ["alert-rules", variables.projectId],
      });

      toast.success("Alert rule created successfully");
    },

    onError: (error) => {
      const message = error.response?.data?.message ?? "Failed to create alert rule";
      toast.error(message);
    },
  });
}