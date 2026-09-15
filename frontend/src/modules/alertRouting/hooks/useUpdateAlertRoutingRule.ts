import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateAlertRoutingRule } from "../api/alertRoutingRuleApi";

import type { AlertRoutingRule, UpdateAlertRoutingRuleVariables } from "../types/alertRoutingRule.types";

import type { ErrorResponse } from "@/core/types/error.types";

export function useUpdateAlertRoutingRule() {
  const queryClient = useQueryClient();

  return useMutation<AlertRoutingRule, AxiosError<ErrorResponse>, UpdateAlertRoutingRuleVariables>({
    mutationFn: ({ id, data }) => updateAlertRoutingRule(id, data),

    onSuccess: (data) => {
      queryClient.setQueryData(["alert-routing-rule", data.id], data,);

      queryClient.invalidateQueries({
        queryKey: ["alert-routing-rules"],
      });

      toast.success("Alert routing rule updated successfully",);
    },

    onError: (error) => {
      const message = error.response?.data?.message ?? "Failed to update alert routing rule";
      toast.error(message);
    },
  });
}