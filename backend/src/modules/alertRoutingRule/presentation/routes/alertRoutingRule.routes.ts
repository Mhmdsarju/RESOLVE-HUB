import { Router } from "express";
import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { AlertRoutingRuleController } from "../controllers/AlertRoutingRuleController";

export function createAlertRoutingRuleRoutes(alertRoutingRuleController: AlertRoutingRuleController) {
    const router = Router();

    router.route("/")
        .post(authMiddleware, alertRoutingRuleController.create.bind(alertRoutingRuleController))
        .get(authMiddleware, alertRoutingRuleController.getAll.bind(alertRoutingRuleController));

    router.route("/:id")
        .get(authMiddleware, alertRoutingRuleController.getById.bind(alertRoutingRuleController))
        .put(authMiddleware, alertRoutingRuleController.update.bind(alertRoutingRuleController))
        .delete(authMiddleware, alertRoutingRuleController.delete.bind(alertRoutingRuleController));

    return router;
}