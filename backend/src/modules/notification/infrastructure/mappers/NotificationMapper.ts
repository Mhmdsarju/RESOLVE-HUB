import {    Notification as PrismaNotification,    NotificationType as PrismaNotificationType,} from "@prisma/client";

import { Notification } from "../../domain/entity/notification.entity"; 
import { NotificationType } from "../../domain/enums/NotificationType"; 

export class NotificationMapper {
    static toDb(notification: Notification) {
        return {
            userId: notification.userId,
            type: notification.type as PrismaNotificationType,
            title: notification.title,
            message: notification.message,
            isRead: notification.isRead,
        };
    }
    static fromDb(data: PrismaNotification): Notification {
        return new Notification({
            id: data.id,
            userId: data.userId,
            type: data.type as NotificationType,
            title: data.title,
            message: data.message,
            isRead: data.isRead,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        });
    }
}