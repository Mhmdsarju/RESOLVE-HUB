import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updatePlan } from "../api/plan.api";

import type { Plan, UpdatePlanVariables, } from "../types/plan.types";

import type { ErrorResponse } from "@/core/types/error.types";


export function useUpdatePlan() {
    const queryClient = useQueryClient();

    return useMutation<Plan, AxiosError<ErrorResponse>, UpdatePlanVariables>({
        mutationFn: ({ id, data }) => updatePlan(id, data),

        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["plans"],
            });

            queryClient.setQueryData<Plan>(
                ["plan", data.id],
                data,
            );

            toast.success("Plan updated successfully",);
        },

        onError: (error) => {
            const message = error.response?.data?.message ?? "Failed to update plan";
            toast.error(message);
        },
    });
}