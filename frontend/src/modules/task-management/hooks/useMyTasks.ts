import { useQuery } from "@tanstack/react-query";

import { getMyTasks } from "../api/taskApi";

import type { Task } from "../types/task.types";

export function useMyTasks() {
    return useQuery<Task[], Error>({
        queryKey: ["my-tasks"],
        queryFn: getMyTasks,

        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchInterval: 10000,
        refetchIntervalInBackground:false
    });
}