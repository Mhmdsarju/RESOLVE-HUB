import { Notification } from "../entity/notification.entity"; 

export interface INotificationRepository {
    create(notification: Notification): Promise<Notification>;
    findByUserId(userId: string): Promise<Notification[]>;
    findById(id: string): Promise<Notification | null>;
    markAsRead(id: string): Promise<Notification>;
    markAllAsRead(userId: string): Promise<void>;
    getUnreadCount(userId: string): Promise<number>;
}