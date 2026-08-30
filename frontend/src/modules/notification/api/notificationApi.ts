import { api } from "@/core/api/axios";
import { ENDPOINTS } from "@/core/api/endpoints";

import type { Notification, } from "../types/notification.types";

export async function getNotifications(): Promise<Notification[]> {
    const response = await api.get(
        ENDPOINTS.NOTIFICATION.BASE,
    );

    return response.data.data;
}

export async function getUnreadNotificationCount(): Promise<number> {
    const response = await api.get(
        ENDPOINTS.NOTIFICATION.UNREAD_COUNT,
    );

    return response.data.data.count;
}

export async function markNotificationAsRead(notificationId: string,): Promise<Notification> {
    const response = await api.patch(
        ENDPOINTS.NOTIFICATION.MARK_AS_READ(notificationId),
    );

    return response.data.data;
}

export async function markAllNotificationsAsRead(): Promise<void> {
    await api.patch(
        ENDPOINTS.NOTIFICATION.MARK_ALL_AS_READ,
    );
}