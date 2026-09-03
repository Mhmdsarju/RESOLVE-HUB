import { api } from "@/core/api/axios";
import { ENDPOINTS } from "@/core/api/endpoints";

import type {    Subscription,    SubscriptionAccess,    UpgradeSubscriptionPayload,} from "../types/subscription.types";

export async function createFreeSubscription(): Promise<Subscription> {
    const response = await api.post(
        ENDPOINTS.SUBSCRIPTION.FREE,
    );

    return response.data.data;
}

export async function getSubscription(): Promise<Subscription> {
    const response = await api.get(
        ENDPOINTS.SUBSCRIPTION.BASE,
    );

    return response.data.data;
}

export async function upgradeSubscription(
    payload: UpgradeSubscriptionPayload,
): Promise<Subscription> {
    const response = await api.post(
        ENDPOINTS.SUBSCRIPTION.UPGRADE,
        payload,
    );

    return response.data.data;
}

export async function checkSubscriptionAccess(): Promise<SubscriptionAccess> {
    const response = await api.get(
        ENDPOINTS.SUBSCRIPTION.ACCESS,
    );

    return response.data.data;
}