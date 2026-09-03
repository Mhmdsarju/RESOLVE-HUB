import { Router } from "express";
import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { IntegrationController } from "../controllers/IntegrationController";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createIntegrationRoutes(controller: IntegrationController) {
    const router = Router();

    router.use(authMiddleware);
    router.use(organizationAccessMiddleware);

    router.route("/:projectId/integrations")
        .post(controller.create.bind(controller))
        .get(controller.getAll.bind(controller));

    router.route("/integrations/:id")
        .get(controller.getById.bind(controller))
        .put(controller.update.bind(controller))
        .delete(controller.delete.bind(controller));

    return router;
}