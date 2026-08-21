import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createIntegration } from "../api/integrationApi";

import type { CreateIntegrationDto, Integration, } from "../types/integration.types";

import type { ErrorResponse } from "@/core/types/error.types";


interface CreateIntegrationVariables {
    projectId: string;
    data: CreateIntegrationDto;
}


export function useCreateIntegration() {
    const queryClient = useQueryClient();

    return useMutation<Integration, AxiosError<ErrorResponse>, CreateIntegrationVariables>({
        mutationFn: ({ projectId, data }) => createIntegration(projectId, data),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["integrations", variables.projectId,],
            });

            toast.success("Integration created successfully",);
        },

        onError: (error) => {
            const message = error.response?.data?.message ?? "Failed to create integration";
            toast.error(message);
        },
    });
}