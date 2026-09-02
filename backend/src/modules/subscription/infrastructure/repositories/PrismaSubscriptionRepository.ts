import { injectable } from "inversify";

import { prisma } from "@/config/database";

import { Subscription } from "../../domain/entity/subscription.entity";
import { ISubscriptionRepository } from "../../domain/interface/ISubscriptionRepository";
import { SubscriptionStatus } from "../../domain/enums/subscriptionStatus.enum";
import { SubscriptionMapper } from "../mappers/SubscriptionMapper";

@injectable()
export class PrismaSubscriptionRepository implements ISubscriptionRepository {

    async create(subscription: Subscription): Promise<Subscription> {
        const created = await prisma.subscription.create({
            data: SubscriptionMapper.toDb(subscription),
        });

        return SubscriptionMapper.fromDb(created);
    }

    async findById(id: string): Promise<Subscription | null> {
        const subscription = await prisma.subscription.findUnique({
            where: { id },
        });

        if (!subscription) {
            return null;
        }

        return SubscriptionMapper.fromDb(subscription);
    }

    async findAll(): Promise<Subscription[]> {
        const subscriptions = await prisma.subscription.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return subscriptions.map(SubscriptionMapper.fromDb);
    }

    async update(id: string, data: Partial<Subscription>): Promise<Subscription> {
        const updated = await prisma.subscription.update({
            where: { id },
            data: SubscriptionMapper.toDb({
                ...(data as Subscription),
            }),
        });

        return SubscriptionMapper.fromDb(updated);
    }

    async delete(id: string): Promise<void> {
        await prisma.subscription.delete({
            where: { id },
        });
    }

    async findByOrganizationId(organizationId: string): Promise<Subscription | null> {
        const subscription = await prisma.subscription.findUnique({
            where: {
                organizationId,
            },
        });

        if (!subscription) {
            return null;
        }

        return SubscriptionMapper.fromDb(subscription);
    }

    async findByOrganizationIdAndStatus(
        organizationId: string,
        status: SubscriptionStatus,
    ): Promise<Subscription | null> {
        const subscription = await prisma.subscription.findFirst({
            where: {
                organizationId,
                status,
            },
        });

        if (!subscription) {
            return null;
        }

        return SubscriptionMapper.fromDb(subscription);
    }

    async findExpiringSubscriptions(
        startDate: Date,
        endDate: Date,
    ): Promise<Subscription[]> {
        const subscriptions = await prisma.subscription.findMany({
            where: {
                status: SubscriptionStatus.ACTIVE,
                endDate: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });

        return subscriptions.map(SubscriptionMapper.fromDb);
    }

    async updateReminder10DaysSentAt(
        id: string,
        sentAt: Date,
    ): Promise<Subscription> {
        const updated = await prisma.subscription.update({
            where: { id },
            data: {
                reminder10DaysSentAt: sentAt,
            },
        });

        return SubscriptionMapper.fromDb(updated);
    }

    async updateReminder2DaysSentAt(
        id: string,
        sentAt: Date,
    ): Promise<Subscription> {
        const updated = await prisma.subscription.update({
            where: { id },
            data: {
                reminder2DaysSentAt: sentAt,
            },
        });

        return SubscriptionMapper.fromDb(updated);
    }

    async findExpiredSubscriptions(date: Date): Promise<Subscription[]> {
    const subscriptions = await prisma.subscription.findMany({
        where: {
            status: SubscriptionStatus.ACTIVE,
            endDate: {
                lte: date,
            },
        },
    });

    return subscriptions.map(SubscriptionMapper.fromDb);
}

}