import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateAlertRule } from "../api/alertRuleApi";

import type { AlertRule, UpdateAlertRuleVariables } from "../types/alertRule.types";

import type { ErrorResponse } from "@/core/types/error.types";



export function useUpdateAlertRule() {
  const queryClient = useQueryClient();

  return useMutation<AlertRule, AxiosError<ErrorResponse>, UpdateAlertRuleVariables>({
    mutationFn: ({ id, data }) => updateAlertRule(id, data),

    onSuccess: (data, variables) => {
      queryClient.setQueryData(["alert-rule", data.id], data,);

      queryClient.invalidateQueries({
        queryKey: ["alert-rules", variables.projectId],
      });

      toast.success("Alert rule updated successfully");
    },

    onError: (error) => {
      const message = error.response?.data?.message ?? "Failed to update alert rule";
      toast.error(message);
    },
  });
}