import { Router } from "express";
import { AlertRuleController } from "../controllers/AlertRuleController";
import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createAlertRuleRoutes(controller: AlertRuleController) {
    const router = Router();

    router.use(authMiddleware);
    router.use(organizationAccessMiddleware);

    router.route("/:projectId/alert-rules")
        .post(controller.create.bind(controller))
        .get(controller.getAll.bind(controller));

    router.get("/alert-rules/defaults", controller.getDefaults.bind(controller));

    router.post("/:projectId/alert-rules/default", controller.applyDefault.bind(controller));

    router.route("/alert-rules/:id")
        .get(controller.getById.bind(controller))
        .put(controller.update.bind(controller))
        .delete(controller.delete.bind(controller));

    return router;
}