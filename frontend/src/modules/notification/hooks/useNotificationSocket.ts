import { useEffect } from "react";

import { socket } from "@/core/config/socket";

import type { Notification } from "../types/notification.types";

interface UseNotificationSocketProps {
    onNotification: (notification: Notification) => void;
}

export function useNotificationSocket({ onNotification, }: UseNotificationSocketProps) {

    useEffect(() => {

        const handleNewNotification = (notification: Notification,) => {
            onNotification(notification);
        };

        socket.on("notification:new", handleNewNotification,);

        return () => {
            socket.off("notification:new", handleNewNotification,);
        };

    }, [onNotification]);

}