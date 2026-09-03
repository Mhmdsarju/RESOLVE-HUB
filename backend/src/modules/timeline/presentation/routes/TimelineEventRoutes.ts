import { Router } from "express";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { TimelineEventController } from "../controller/TimelineEventController";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createTimelineEventRoutes(timelineEventController: TimelineEventController,) {
    const router = Router();

    router.use(authMiddleware);
    router.use(organizationAccessMiddleware);

    router.post("/", timelineEventController.create.bind(timelineEventController),);
    router.get("/incident/:incidentId", timelineEventController.getByIncidentId.bind(timelineEventController),);

    return router;
}