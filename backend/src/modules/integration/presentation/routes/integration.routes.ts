import { Router } from "express";
import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { IntegrationController } from "../controllers/IntegrationController";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createIntegrationRoutes(controller: IntegrationController) {
    const router = Router();

    router.route("/:projectId/integrations")
        .post(authMiddleware,organizationAccessMiddleware,controller.create.bind(controller))
        .get(authMiddleware,organizationAccessMiddleware,controller.getAll.bind(controller));

    router.route("/integrations/:id")
        .get(authMiddleware,organizationAccessMiddleware,controller.getById.bind(controller))
        .put(authMiddleware,organizationAccessMiddleware,controller.update.bind(controller))
        .delete(authMiddleware,organizationAccessMiddleware,controller.delete.bind(controller));

    return router;
}