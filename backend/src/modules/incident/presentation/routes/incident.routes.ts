import { Router } from "express";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { IncidentController } from "../controllers/IncidentController";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createIncidentRoutes(incidentController: IncidentController) {
    const router = Router();

    router.use(authMiddleware);
    router.use(organizationAccessMiddleware);

    router.post("/", incidentController.createIncident.bind(incidentController));
    router.get("/stats", incidentController.getStats.bind(incidentController));
    router.get("/", incidentController.getAll.bind(incidentController));
    router.patch("/:id/status", incidentController.updateStatus.bind(incidentController));
    router.patch("/:id/assign", incidentController.assignTeam.bind(incidentController));
    router.get("/:id", incidentController.getById.bind(incidentController));

    return router;
}