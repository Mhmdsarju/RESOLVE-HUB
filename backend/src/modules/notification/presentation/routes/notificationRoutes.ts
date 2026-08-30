import { Router } from "express";

import { NotificationController } from "../controller/NotificationController";

import { authMiddleware } from "@/app/middlewares/authMiddleware";

export function createNotificationRoutes(notificationController: NotificationController,) {
    const router = Router();

    router.get("/", authMiddleware, notificationController.getNotifications.bind(notificationController),);

    router.get("/unread-count", authMiddleware, notificationController.getUnreadCount.bind(notificationController),);

    router.patch("/:id/read", authMiddleware, notificationController.markAsRead.bind(notificationController),);

    router.patch("/read-all", authMiddleware, notificationController.markAllAsRead.bind(notificationController),);

    return router;
}