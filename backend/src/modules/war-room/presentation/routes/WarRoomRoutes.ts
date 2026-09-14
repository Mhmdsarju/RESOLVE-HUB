import { Router } from "express";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { WarRoomController } from "../controller/WarRoomController";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createWarRoomRoutes(warRoomController: WarRoomController) {
    const router = Router();


    router.post("/", authMiddleware,organizationAccessMiddleware,warRoomController.create.bind(warRoomController),);

    router.get("/", authMiddleware,organizationAccessMiddleware,warRoomController.getAll.bind(warRoomController),);

    router.get("/:id", authMiddleware,organizationAccessMiddleware,warRoomController.getById.bind(warRoomController),);

    router.patch("/:id/close", authMiddleware,organizationAccessMiddleware,warRoomController.close.bind(warRoomController),);

    router.post("/:id/join", authMiddleware,organizationAccessMiddleware,warRoomController.join.bind(warRoomController),);

    router.post("/:id/leave", authMiddleware,organizationAccessMiddleware,warRoomController.leave.bind(warRoomController),);

    return router;
}