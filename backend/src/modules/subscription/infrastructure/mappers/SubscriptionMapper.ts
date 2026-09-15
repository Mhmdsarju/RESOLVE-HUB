import { Subscription as PrismaSubscription, SubscriptionStatus as PrismaSubscriptionStatus } from "@prisma/client";

import { Subscription } from "../../domain/entity/subscription.entity";
import { SubscriptionStatus } from "../../domain/enums/subscriptionStatus.enum";

export class SubscriptionMapper {

    static fromDb(subscription: PrismaSubscription): Subscription {
        return new Subscription({
            id: subscription.id,
            organizationId: subscription.organizationId,
            planId: subscription.planId,
            status: subscription.status as SubscriptionStatus,
            startDate: subscription.startDate,
            endDate: subscription.endDate,
            reminder10DaysSentAt: subscription.reminder10DaysSentAt,
            reminder2DaysSentAt: subscription.reminder2DaysSentAt,
            createdAt: subscription.createdAt,
            updatedAt: subscription.updatedAt,
        });
    }

    static toDb(subscription: Subscription) {
        return {
            organizationId: subscription.organizationId,
            planId: subscription.planId,
            status: subscription.status as PrismaSubscriptionStatus,
            startDate: subscription.startDate,
            endDate: subscription.endDate,
            reminder10DaysSentAt: subscription.reminder10DaysSentAt,
            reminder2DaysSentAt: subscription.reminder2DaysSentAt,
        };
    }
}