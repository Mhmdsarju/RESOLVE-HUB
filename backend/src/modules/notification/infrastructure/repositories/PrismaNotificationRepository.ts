import { injectable } from "inversify";

import { prisma } from "@/config/database";

import { INotificationRepository } from "../../domain/interface/INotificationRepository";
import { Notification } from "../../domain/entity/notification.entity";

import { NotificationMapper } from "../mappers/NotificationMapper";

@injectable()
export class PrismaNotificationRepository implements INotificationRepository {

    async create(notification: Notification): Promise<Notification> {
        const created = await prisma.notification.create({
            data: NotificationMapper.toDb(notification),
        });

        return NotificationMapper.fromDb(created);
    }

    async findByUserId(userId: string): Promise<Notification[]> {
        const notifications = await prisma.notification.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return notifications.map(NotificationMapper.fromDb);
    }

    async findById(id: string): Promise<Notification | null> {
        const notification = await prisma.notification.findUnique({
            where: {
                id,
            },
        });

        return notification
            ? NotificationMapper.fromDb(notification)
            : null;
    }

    async markAsRead(id: string): Promise<Notification> {
        const notification = await prisma.notification.update({
            where: {
                id,
            },
            data: {
                isRead: true,
            },
        });

        return NotificationMapper.fromDb(notification);
    }

    async markAllAsRead(userId: string): Promise<void> {
        await prisma.notification.updateMany({
            where: {
                userId,
                isRead: false,
            },
            data: {
                isRead: true,
            },
        });
    }

    async getUnreadCount(userId: string): Promise<number> {
        return prisma.notification.count({
            where: {
                userId,
                isRead: false,
            },
        });
    }
}