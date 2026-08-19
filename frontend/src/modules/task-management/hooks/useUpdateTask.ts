import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateTask } from "../api/taskApi";

import type { Task, UpdateTaskPayload, } from "../types/task.types";

import type { ErrorResponse } from "@/core/types/error.types";

interface UpdateTaskVariables {
    taskId: string;
    payload: UpdateTaskPayload;
}

export function useUpdateTask(incidentId: string) {
    const queryClient = useQueryClient();

    return useMutation<Task, AxiosError<ErrorResponse>, UpdateTaskVariables>({
        mutationFn: ({ taskId, payload }) => updateTask(taskId, payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks", incidentId,],
            });

            toast.success("Task updated successfully",);
        },

        onError: (error) => {
            const message = error.response?.data?.message ?? "Failed to update task";
            toast.error(message);
        },
    });
}