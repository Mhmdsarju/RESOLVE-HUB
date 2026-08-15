import { Router } from "express";

import container from "@/config/inversify.config";
import { TYPES } from "@/config/types";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { AlertController } from "../controllers/AlertController";

const router = Router();

const alertController = container.get<AlertController>(TYPES.AlertController);

router.post(
    "/monitoring-projects/integrations/:integrationId/webhook",
    alertController.prometheusWebhook.bind(alertController)
);

router.route("/monitoring-projects/:projectId/alerts")
    .post(authMiddleware, alertController.create.bind(alertController))
    .get(authMiddleware, alertController.getAll.bind(alertController));

router.get("/alerts/:id", authMiddleware, alertController.getById.bind(alertController));

router.patch("/alerts/:id/resolve", authMiddleware, alertController.resolve.bind(alertController));


export default router;