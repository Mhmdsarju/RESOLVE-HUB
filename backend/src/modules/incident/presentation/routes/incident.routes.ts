import { Router } from "express";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { IncidentController } from "../controllers/IncidentController";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createIncidentRoutes(incidentController: IncidentController) {
    const router = Router();

    router.post("/",authMiddleware,organizationAccessMiddleware, incidentController.createIncident.bind(incidentController));
    router.get("/stats",authMiddleware,organizationAccessMiddleware, incidentController.getStats.bind(incidentController));
    router.get("/",authMiddleware,organizationAccessMiddleware, incidentController.getAll.bind(incidentController));
    router.patch("/:id/status",authMiddleware,organizationAccessMiddleware, incidentController.updateStatus.bind(incidentController));
    router.patch("/:id/assign", authMiddleware,organizationAccessMiddleware,incidentController.assignTeam.bind(incidentController));
    router.get("/:id",authMiddleware,organizationAccessMiddleware, incidentController.getById.bind(incidentController));

    return router;
}