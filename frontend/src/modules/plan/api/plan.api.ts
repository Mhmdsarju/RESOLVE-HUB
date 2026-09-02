import { api } from "@/core/api/axios";
import { ENDPOINTS } from "@/core/api/endpoints";

import type { Plan,CreatePlanPayload,UpdatePlanPayload } from "../types/plan.types";

export async function createPlan(payload: CreatePlanPayload,): Promise<Plan> {
    const response = await api.post(
        ENDPOINTS.PLAN.BASE,
        payload,
    );

    return response.data.data;
}


export async function getPlans(): Promise<Plan[]> {
    const response = await api.get(
        ENDPOINTS.PLAN.BASE,
    );

    return response.data.data;
}


export async function updatePlan(id: string, payload: UpdatePlanPayload,): Promise<Plan> {
    const response = await api.patch(
        ENDPOINTS.PLAN.BY_ID(id),
        payload,
    );

    return response.data.data;
}