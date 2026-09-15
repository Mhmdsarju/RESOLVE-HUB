import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateTaskStatus } from "../api/taskApi";

import type { Task, UpdateTaskStatusPayload, } from "../types/task.types";

import type { ErrorResponse } from "@/core/types/error.types";

export function useUpdateTaskStatus(incidentId?: string,) {
    const queryClient = useQueryClient();

    return useMutation<Task, AxiosError<ErrorResponse>, UpdateTaskStatusPayload>({
        mutationFn: ({ taskId, status }) =>
            updateTaskStatus(taskId, {
                taskId,
                status,
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["my-tasks"],
            });

            if (incidentId) {
                queryClient.invalidateQueries({
                    queryKey: ["tasks", incidentId],
                });
            }

            toast.success("Task status updated successfully",)
        },

        onError: (error) => {
            const message = error.response?.data?.message ?? "Failed to update task status";
            toast.error(message)
        },
    });
}