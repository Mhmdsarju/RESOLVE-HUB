import { Router } from "express";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { TimelineEventController } from "../controller/TimelineEventController";

export function createTimelineEventRoutes(timelineEventController: TimelineEventController,) {
    const router = Router();

    router.post("/", authMiddleware, timelineEventController.create.bind(timelineEventController),);
    router.get("/incident/:incidentId", authMiddleware, timelineEventController.getByIncidentId.bind(timelineEventController),);

    return router;
}