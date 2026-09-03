import { Router } from "express";

import { NotificationController } from "../controller/NotificationController";

import { authMiddleware } from "@/app/middlewares/authMiddleware";

export function createNotificationRoutes(notificationController: NotificationController,) {
    const router = Router();

    router.use(authMiddleware);

    router.get("/", notificationController.getNotifications.bind(notificationController),);
    router.get("/unread-count", notificationController.getUnreadCount.bind(notificationController),);
    router.patch("/:id/read", notificationController.markAsRead.bind(notificationController),);
    router.patch("/read-all", notificationController.markAllAsRead.bind(notificationController),);

    return router;
}