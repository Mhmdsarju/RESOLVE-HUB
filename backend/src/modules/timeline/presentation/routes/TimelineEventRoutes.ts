import { Router } from "express";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { TimelineEventController } from "../controller/TimelineEventController";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createTimelineEventRoutes(timelineEventController: TimelineEventController,) {
    const router = Router();


    router.post("/",authMiddleware,organizationAccessMiddleware, timelineEventController.create.bind(timelineEventController),);
    router.get("/incident/:incidentId",authMiddleware,organizationAccessMiddleware, timelineEventController.getByIncidentId.bind(timelineEventController),);

    return router;
}