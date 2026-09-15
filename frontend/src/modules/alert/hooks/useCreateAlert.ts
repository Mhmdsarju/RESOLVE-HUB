import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createAlert } from "../api/alertApi";

import type { Alert, } from "../types/alert.types";

import type { ErrorResponse } from "@/core/types/error.types";

import type { CreateAlertVariables } from "../types/alert.types";

export function useCreateAlert() {
    const queryClient = useQueryClient();

    return useMutation<Alert, AxiosError<ErrorResponse>, CreateAlertVariables>({
        mutationFn: ({ projectId, data }) => createAlert(projectId, data),

        onSuccess: (data, variables) => {
            queryClient.setQueryData(["alert", data.id], data,);

            queryClient.invalidateQueries({
                queryKey: ["alerts", variables.projectId],
            });

            toast.success("Alert created successfully");
        },

        onError: (error) => {
            const message = error.response?.data?.message ?? "Failed to create alert";
            toast.error(message);
        },
    });
}