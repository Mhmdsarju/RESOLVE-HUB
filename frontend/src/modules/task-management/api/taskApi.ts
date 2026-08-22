import { api } from "@/core/api/axios";
import { ENDPOINTS } from "@/core/api/endpoints";

import type {
    AssignTaskPayload,
    CreateTaskPayload,
    GetTasksParams,
    GetTasksResponse,
    Task,
    UpdateTaskPayload,
    UpdateTaskStatusPayload,
} from "../types/task.types";


export async function getMyTasks(params: GetTasksParams,): Promise<GetTasksResponse> {
    const response = await api.get(
        ENDPOINTS.TASK.MY,
        {
            params,
        },
    );

    return response.data.data;
}

export async function getTasksByIncident(incidentId: string, params?: GetTasksParams,): Promise<GetTasksResponse> {
    const response = await api.get(
        ENDPOINTS.TASK.BY_INCIDENT(incidentId),
        {
            params,
        },
    );

    return response.data.data;
}

export async function createTask(payload: CreateTaskPayload,): Promise<Task> {
    const response = await api.post(
        ENDPOINTS.TASK.BASE,
        payload,
    );

    return response.data.data;
}

export async function updateTask(taskId: string, payload: UpdateTaskPayload,): Promise<Task> {
    const response = await api.put(
        ENDPOINTS.TASK.BY_ID(taskId),
        payload,
    );

    return response.data.data;
}

export async function updateTaskStatus(taskId: string, payload: UpdateTaskStatusPayload,): Promise<Task> {
    const response = await api.patch(
        ENDPOINTS.TASK.STATUS(taskId),
        {
            status: payload.status,
        },
    );

    return response.data.data;
}

export async function assignTask(taskId: string, payload: AssignTaskPayload,): Promise<Task> {
    const response = await api.patch(
        ENDPOINTS.TASK.ASSIGN(taskId),
        {
            userId: payload.userId,
        },
    );

    return response.data.data;
}

export async function deleteTask(taskId: string,): Promise<void> {
    await api.delete(
        ENDPOINTS.TASK.BY_ID(taskId),
    );
}

export async function getTaskById(taskId: string): Promise<Task> {
    const response = await api.get(
        ENDPOINTS.TASK.BY_ID(taskId)
    )

    return response.data.data;
}