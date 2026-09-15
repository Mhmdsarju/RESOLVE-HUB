export type NotificationType =
    | "SYSTEM"
    | "INCIDENT"
    | "TASK";

export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface GetNotificationsResponse {
    data: Notification[];
}

export interface GetUnreadNotificationCountResponse {
    count: number;
}