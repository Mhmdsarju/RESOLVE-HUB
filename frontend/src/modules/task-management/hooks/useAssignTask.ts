import { AxiosError } from "axios";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { assignTask } from "../api/taskApi";

import type { AssignTaskPayload, Task, } from "../types/task.types";

import type { ErrorResponse } from "@/core/types/error.types";


export function useAssignTask(incidentId: string,) {
    const queryClient = useQueryClient();

    return useMutation<Task, AxiosError<ErrorResponse>, AssignTaskPayload>({
        mutationFn: ({ taskId, userId }) =>
            assignTask(taskId, { taskId, userId, }),

        onSuccess: (data) => {
            queryClient.setQueryData(["task", data.id], data,);

            queryClient.invalidateQueries({
                queryKey: ["tasks", incidentId],
            });

            queryClient.invalidateQueries({
                queryKey: ["my-tasks"],
            });

            toast.success("Task assigned successfully",);
        },

        onError: (error) => {
            const message = error.response?.data?.message ?? "Failed to assign task";
            toast.error(message);
        },
    });
}