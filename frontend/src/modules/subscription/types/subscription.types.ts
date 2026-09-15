import type { Plan } from "@/modules/plan/types/plan.types";

export type SubscriptionStatus = "ACTIVE" | "EXPIRED" | "CANCELLED";

export interface Subscription {
    id: string;
    organizationId: string;
    planId: string;
    status: SubscriptionStatus;
    startDate: string;
    endDate: string | null;
    reminder10DaysSentAt: string | null;
    reminder2DaysSentAt: string | null;
    createdAt: string;
    updatedAt: string;
    plan?: Plan;
}

export interface SubscriptionAccess {
    hasAccess: boolean;
    isPremium: boolean;
    maxProjects: number | null;
}

export interface UpgradeSubscriptionPayload {
    planId: string;
}