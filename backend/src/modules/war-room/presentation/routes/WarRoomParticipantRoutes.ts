import { Router } from "express";

import { authMiddleware } from "@/app/middlewares/authMiddleware";

import { WarRoomParticipantController } from "../controller/WarRoomParticipantController";

export function createWarRoomParticipantRoutes(warRoomParticipantController: WarRoomParticipantController,) {

    const router = Router();

    router.get("/:id/participants", authMiddleware, warRoomParticipantController.getParticipants.bind(warRoomParticipantController,),);

    return router;
}