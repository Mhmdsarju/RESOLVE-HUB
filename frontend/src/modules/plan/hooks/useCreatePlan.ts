import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createPlan } from "../api/plan.api";

import type { CreatePlanPayload, Plan, } from "../types/plan.types";

import type { ErrorResponse } from "@/core/types/error.types";


export function useCreatePlan() {
  const queryClient = useQueryClient();

  return useMutation<Plan, AxiosError<ErrorResponse>, CreatePlanPayload>({
    mutationFn: (data) => createPlan(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["plans"],
      });

      toast.success("Plan created successfully",);
    },

    onError: (error) => {
      const message = error.response?.data?.message ?? "Failed to create plan";
      toast.error(message);
    },
  });
}