import { useQuery } from "@tanstack/react-query";

import { getTasksByIncident } from "../api/taskApi";

import type { GetTasksParams, GetTasksResponse, } from "../types/task.types";

export function useTasks(incidentId: string, params: GetTasksParams = {},) {
    return useQuery<GetTasksResponse>({
        queryKey: [
            "tasks",
            incidentId,
            params.page ?? 1,
            params.limit ?? 10,
            params.search ?? "",
            params.status,
            params.priority,
            params.assignedTo,
        ],

        queryFn: () => getTasksByIncident(incidentId, params,),

        enabled: Boolean(incidentId),

        refetchOnWindowFocus: true,

        refetchOnReconnect: true,

        refetchInterval: 5000,

        refetchIntervalInBackground: false,
    });
}