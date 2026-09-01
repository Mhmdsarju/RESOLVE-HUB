import { Router } from "express";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { WarRoomMessageController } from "../controller/WarRoomMessageController";

export function createWarRoomMessageRoutes(warRoomMessageController: WarRoomMessageController,) {
    const router = Router();

    router.get(
        "/:id/messages",
        authMiddleware,
        warRoomMessageController.getMessages.bind(warRoomMessageController),
    );

    return router;
}