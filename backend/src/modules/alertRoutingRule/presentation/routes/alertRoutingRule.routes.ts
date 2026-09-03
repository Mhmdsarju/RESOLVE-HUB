import { Router } from "express";
import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { AlertRoutingRuleController } from "../controllers/AlertRoutingRuleController";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createAlertRoutingRuleRoutes(alertRoutingRuleController: AlertRoutingRuleController) {
    const router = Router();

    router.use(authMiddleware);
    router.use(organizationAccessMiddleware);

    router.route("/")
        .post(alertRoutingRuleController.create.bind(alertRoutingRuleController))
        .get(alertRoutingRuleController.getAll.bind(alertRoutingRuleController));

    router.route("/:id")
        .get(alertRoutingRuleController.getById.bind(alertRoutingRuleController))
        .put(alertRoutingRuleController.update.bind(alertRoutingRuleController))
        .delete(alertRoutingRuleController.delete.bind(alertRoutingRuleController));

    return router;
}