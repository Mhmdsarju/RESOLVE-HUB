import { Router } from "express";

import { authMiddleware } from "@/app/middlewares/authMiddleware";

import { WarRoomParticipantController } from "../controller/WarRoomParticipantController";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createWarRoomParticipantRoutes(warRoomParticipantController: WarRoomParticipantController,) {

    const router = Router();

    router.get("/:id/participants", authMiddleware,organizationAccessMiddleware, warRoomParticipantController.getParticipants.bind(warRoomParticipantController,),);

    return router;
}