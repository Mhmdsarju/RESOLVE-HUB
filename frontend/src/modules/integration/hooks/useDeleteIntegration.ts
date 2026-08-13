import { AxiosError } from "axios";
import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteIntegration } from "../api/integrationApi";

import type { ErrorResponse } from "@/core/types/error.types";


interface DeleteIntegrationVariables {
    id: string;
}


export function useDeleteIntegration() {
    const queryClient = useQueryClient();

    return useMutation<
        null,
        AxiosError<ErrorResponse>,
        DeleteIntegrationVariables
    >({
        mutationFn: ({ id }) => deleteIntegration(id),

        onSuccess: (_, variables) => {
            queryClient.removeQueries({
                queryKey: ["integration", variables.id],
            });

            queryClient.invalidateQueries({
                queryKey: ["integrations"],
            });

            toast.success("Integration deleted successfully");
        },

        onError: (error) => {
            const message =
                error.response?.data?.message ??
                "Failed to delete integration";

            toast.error(message);
        },
    });
}