import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createAlertRoutingRule } from "../api/alertRoutingRuleApi";

import type { AlertRoutingRule, CreateAlertRoutingRuleDto, } from "../types/alertRoutingRule.types";

import type { ErrorResponse } from "@/core/types/error.types";

export function useCreateAlertRoutingRule() {
  const queryClient = useQueryClient();

  return useMutation<AlertRoutingRule, AxiosError<ErrorResponse>, CreateAlertRoutingRuleDto>({
    mutationFn: createAlertRoutingRule,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["alert-routing-rules"],
      });

      toast.success("Alert routing rule created successfully",);
    },

    onError: (error) => {
      const message = error.response?.data?.message ?? "Failed to create alert routing rule";
      toast.error(message);
    },
  });
}