import { IBaseRepository } from "@/shared/base/repositories/IBaseRepository";
import { Subscription } from "../entity/subscription.entity";
import { SubscriptionStatus } from "../enums/subscriptionStatus.enum";

export interface ISubscriptionRepository extends IBaseRepository<Subscription> {

    findByOrganizationId(organizationId: string): Promise<Subscription | null>;

    findByOrganizationIdAndStatus(organizationId: string, status: SubscriptionStatus,): Promise<Subscription | null>;

    findExpiringSubscriptions(startDate: Date, endDate: Date,): Promise<Subscription[]>;

    findExpiredSubscriptions(date: Date,): Promise<Subscription[]>;

    updateReminder10DaysSentAt(id: string, sentAt: Date,): Promise<Subscription>;

    updateReminder2DaysSentAt(id: string, sentAt: Date,): Promise<Subscription>;

}