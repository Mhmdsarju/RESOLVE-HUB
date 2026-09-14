import { Router } from "express";
import { AlertRuleController } from "../controllers/AlertRuleController";
import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createAlertRuleRoutes(controller: AlertRuleController) {
    const router = Router();


    router.route("/:projectId/alert-rules")
        .post(authMiddleware,organizationAccessMiddleware, controller.create.bind(controller))
        .get(authMiddleware,organizationAccessMiddleware, controller.getAll.bind(controller));

    router.get("/alert-rules/defaults",authMiddleware,organizationAccessMiddleware, controller.getDefaults.bind(controller));

    router.post("/:projectId/alert-rules/default",authMiddleware,organizationAccessMiddleware, controller.applyDefault.bind(controller));

    router.route("/alert-rules/:id")
        .get(authMiddleware,organizationAccessMiddleware,controller.getById.bind(controller))
        .put(authMiddleware,organizationAccessMiddleware,controller.update.bind(controller))
        .delete(authMiddleware,organizationAccessMiddleware,controller.delete.bind(controller));

    return router;
}