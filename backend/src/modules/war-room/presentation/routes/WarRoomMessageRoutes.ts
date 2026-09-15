import { Router } from "express";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { WarRoomMessageController } from "../controller/WarRoomMessageController";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createWarRoomMessageRoutes(warRoomMessageController: WarRoomMessageController,) {
    const router = Router();

    router.get(
        "/:id/messages",
        authMiddleware,organizationAccessMiddleware,
        warRoomMessageController.getMessages.bind(warRoomMessageController),
    );

    return router;
}