import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteAlertRoutingRule } from "../api/alertRoutingRuleApi";

import type { ErrorResponse } from "@/core/types/error.types";

export function useDeleteAlertRoutingRule() {
  const queryClient = useQueryClient();

  return useMutation<null, AxiosError<ErrorResponse>, string>({
    mutationFn: deleteAlertRoutingRule,

    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey: ["alert-routing-rule", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["alert-routing-rules"],
      });

      toast.success("Alert routing rule deleted successfully",);
    },

    onError: (error) => {
      const message = error.response?.data?.message ?? "Failed to delete alert routing rule";
      toast.error(message);
    },
  });
}
