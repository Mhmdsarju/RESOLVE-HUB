import { Router } from "express";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { WarRoomController } from "../controller/WarRoomController";

export function createWarRoomRoutes(warRoomController: WarRoomController) {
    const router = Router();

    router.post("/", authMiddleware, warRoomController.create.bind(warRoomController),);

    router.get("/", authMiddleware, warRoomController.getAll.bind(warRoomController),);

    router.get("/:id", authMiddleware, warRoomController.getById.bind(warRoomController),);

    router.patch("/:id/close", authMiddleware, warRoomController.close.bind(warRoomController),);

    router.post("/:id/join", authMiddleware, warRoomController.join.bind(warRoomController),);

    router.post("/:id/leave", authMiddleware, warRoomController.leave.bind(warRoomController),);

    return router;
}