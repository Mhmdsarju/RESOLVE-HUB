import { Router } from "express";

import container from "@/config/inversify.config";
import { TYPES } from "@/config/types";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { IntegrationController } from "../controllers/IntegrationController";

const router = Router();

const controller = container.get<IntegrationController>(
    TYPES.IntegrationController
);

router.route("/:projectId/integrations")
    .post(authMiddleware, controller.create.bind(controller))
    .get(authMiddleware, controller.getAll.bind(controller));

router.route("/integrations/:id")
    .get(authMiddleware, controller.getById.bind(controller))
    .put(authMiddleware, controller.update.bind(controller))
    .delete(authMiddleware, controller.delete.bind(controller));

export default router;