import { Router } from "express";
import { AlertRuleController } from "../controllers/AlertRuleController";
import { authMiddleware } from "@/app/middlewares/authMiddleware";

export function createAlertRuleRoutes(controller: AlertRuleController) {
    const router = Router();

    router.route("/:projectId/alert-rules")
        .post(authMiddleware, controller.create.bind(controller))
        .get(authMiddleware, controller.getAll.bind(controller));

    router.get("/alert-rules/defaults", authMiddleware, controller.getDefaults.bind(controller));

    router.post("/:projectId/alert-rules/default", authMiddleware, controller.applyDefault.bind(controller));

    router.route("/alert-rules/:id")
        .get(authMiddleware, controller.getById.bind(controller))
        .put(authMiddleware, controller.update.bind(controller))
        .delete(authMiddleware, controller.delete.bind(controller));

    return router;
}