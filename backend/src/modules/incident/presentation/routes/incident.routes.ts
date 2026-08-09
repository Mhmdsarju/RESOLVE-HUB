import { Router } from "express";

import container from "@/config/inversify.config";
import { TYPES } from "@/config/types";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { IncidentController } from "../controllers/IncidentController";

const router = Router();

const incidentController = container.get<IncidentController>(
    TYPES.IncidentController
);

router.post("/", authMiddleware, incidentController.createIncident.bind(incidentController));
router.patch("/:id/status", authMiddleware, incidentController.updateStatus.bind(incidentController));
router.patch("/:id/assign", authMiddleware, incidentController.assignTeam.bind(incidentController));
router.get("/:id", authMiddleware, incidentController.getById.bind(incidentController));
router.get("/", authMiddleware, incidentController.getAll.bind(incidentController));
router.get("/stats", authMiddleware, incidentController.getStats.bind(incidentController));

export default router;