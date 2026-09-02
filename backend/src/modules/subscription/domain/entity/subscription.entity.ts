import { SubscriptionStatus } from "@/modules/subscription/domain/enums/subscriptionStatus.enum";

interface SubscriptionProps {
    id?: string;
    organizationId: string;
    planId: string;
    status: SubscriptionStatus;
    startDate: Date;
    endDate?: Date | null;
    reminder10DaysSentAt?: Date | null;
    reminder2DaysSentAt?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Subscription {
    public readonly id?: string;
    public organizationId: string;
    public planId: string;
    public status: SubscriptionStatus;
    public startDate: Date;
    public endDate?: Date | null;
    public reminder10DaysSentAt?: Date | null;
    public reminder2DaysSentAt?: Date | null;
    public readonly createdAt?: Date;
    public updatedAt?: Date;

    constructor(props: SubscriptionProps) {
        this.id = props.id;
        this.organizationId = props.organizationId;
        this.planId = props.planId;
        this.status = props.status;
        this.startDate = props.startDate;
        this.endDate = props.endDate ?? null;
        this.reminder10DaysSentAt = props.reminder10DaysSentAt ?? null;
        this.reminder2DaysSentAt = props.reminder2DaysSentAt ?? null;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
}