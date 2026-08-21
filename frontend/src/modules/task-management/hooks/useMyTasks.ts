import { useQuery } from "@tanstack/react-query";

import { getMyTasks } from "../api/taskApi";

import type {
    GetTasksResponse,
    TaskPriority,
    TaskStatus,
    TaskType,
} from "../types/task.types";

interface UseMyTasksParams {
    page: number;
    limit: number;
    search?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    type?: TaskType;
}

export function useMyTasks({
    page,
    limit,
    search,
    status,
    priority,
    type,
}: UseMyTasksParams) {
    return useQuery<GetTasksResponse, Error>({
        queryKey: [
            "my-tasks",
            page,
            limit,
            search,
            status,
            priority,
            type,
        ],

        queryFn: () =>
            getMyTasks({
                page,
                limit,
                search,
                status,
                priority,
                type,
            }),

        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchInterval: 10000,
        refetchIntervalInBackground: false,
    });
}