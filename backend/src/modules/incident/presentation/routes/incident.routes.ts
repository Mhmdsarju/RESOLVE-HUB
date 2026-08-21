import { Router } from "express";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { IncidentController } from "../controllers/IncidentController";

export function createIncidentRoutes(incidentController: IncidentController) {
    const router = Router();

    router.post("/", authMiddleware, incidentController.createIncident.bind(incidentController));
    router.get("/stats", authMiddleware, incidentController.getStats.bind(incidentController));
    router.get("/", authMiddleware, incidentController.getAll.bind(incidentController));
    router.patch("/:id/status", authMiddleware, incidentController.updateStatus.bind(incidentController));
    router.patch("/:id/assign", authMiddleware, incidentController.assignTeam.bind(incidentController));
    router.get("/:id", authMiddleware, incidentController.getById.bind(incidentController));

    return router;
}