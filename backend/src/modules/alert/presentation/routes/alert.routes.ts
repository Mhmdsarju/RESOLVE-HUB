import { Router } from "express";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { AlertController } from "../controllers/AlertController";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createAlertRoutes(alertController: AlertController) {
    const router = Router();

    router.post("/monitoring-projects/integrations/:integrationId/webhook", alertController.prometheusWebhook.bind(alertController));

    router.route("/monitoring-projects/:projectId/alerts")
        .post(authMiddleware, alertController.create.bind(alertController))
        .get(authMiddleware, alertController.getAll.bind(alertController));

    router.get("/alerts/:id", authMiddleware, organizationAccessMiddleware,alertController.getById.bind(alertController));
    
    router.patch("/alerts/:id/resolve", authMiddleware,organizationAccessMiddleware, alertController.resolve.bind(alertController));

    return router;
}