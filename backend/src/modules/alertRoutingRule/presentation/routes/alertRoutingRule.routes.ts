import { Router } from "express";
import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { AlertRoutingRuleController } from "../controllers/AlertRoutingRuleController";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createAlertRoutingRuleRoutes(alertRoutingRuleController: AlertRoutingRuleController) {
    const router = Router();


    router.route("/")
        .post(authMiddleware,organizationAccessMiddleware,alertRoutingRuleController.create.bind(alertRoutingRuleController))
        .get(authMiddleware,organizationAccessMiddleware,alertRoutingRuleController.getAll.bind(alertRoutingRuleController));

    router.route("/:id")
        .get(authMiddleware,organizationAccessMiddleware,alertRoutingRuleController.getById.bind(alertRoutingRuleController))
        .put(authMiddleware,organizationAccessMiddleware,alertRoutingRuleController.update.bind(alertRoutingRuleController))
        .delete(authMiddleware,organizationAccessMiddleware,alertRoutingRuleController.delete.bind(alertRoutingRuleController));

    return router;
}