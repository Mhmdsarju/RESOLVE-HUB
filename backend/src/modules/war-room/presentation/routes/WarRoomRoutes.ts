import { Router } from "express";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { WarRoomController } from "../controller/WarRoomController";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createWarRoomRoutes(warRoomController: WarRoomController) {
    const router = Router();

    router.use(authMiddleware);
    router.use(organizationAccessMiddleware);

    router.post("/", warRoomController.create.bind(warRoomController),);

    router.get("/", warRoomController.getAll.bind(warRoomController),);

    router.get("/:id", warRoomController.getById.bind(warRoomController),);

    router.patch("/:id/close", warRoomController.close.bind(warRoomController),);

    router.post("/:id/join", warRoomController.join.bind(warRoomController),);

    router.post("/:id/leave", warRoomController.leave.bind(warRoomController),);

    return router;
}