import { Router } from "express";
import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { IntegrationController } from "../controllers/IntegrationController";

export function createIntegrationRoutes(controller: IntegrationController) {
    const router = Router();

    router.route("/:projectId/integrations")
        .post(authMiddleware, controller.create.bind(controller))
        .get(authMiddleware, controller.getAll.bind(controller));

    router.route("/integrations/:id")
        .get(authMiddleware, controller.getById.bind(controller))
        .put(authMiddleware, controller.update.bind(controller))
        .delete(authMiddleware, controller.delete.bind(controller));

    return router;
}