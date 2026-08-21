import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateIntegration } from "../api/integrationApi";

import type { Integration, UpdateIntegrationVariables } from "../types/integration.types";

import type { ErrorResponse } from "@/core/types/error.types";


export function useUpdateIntegration() {
    const queryClient = useQueryClient();

    return useMutation<Integration, AxiosError<ErrorResponse>, UpdateIntegrationVariables>({
        mutationFn: ({ id, data }) => updateIntegration(id, data),

        onSuccess: (data) => {
            queryClient.setQueryData(
                ["integration", data.id],
                data,
            );

            queryClient.invalidateQueries({
                queryKey: ["integrations"],
            });

            toast.success("Integration updated successfully",);
        },

        onError: (error) => {
            const message = error.response?.data?.message ?? "Failed to update integration";
            toast.error(message);
        },
    });
}