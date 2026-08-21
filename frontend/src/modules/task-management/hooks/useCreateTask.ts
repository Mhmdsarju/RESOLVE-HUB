import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createTask } from "../api/taskApi";

import type { CreateTaskPayload, Task, } from "../types/task.types";

import type { ErrorResponse } from "@/core/types/error.types";


export function useCreateTask(incidentId: string) {
    const queryClient = useQueryClient();

    return useMutation<Task, AxiosError<ErrorResponse>, CreateTaskPayload>({
        mutationFn: createTask,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks", incidentId,],
            });

            toast.success("Task created successfully",);
        },

        onError: (error) => {
            const message = error.response?.data?.message ?? "Failed to create task";
            toast.error(message);
        },
    });
}