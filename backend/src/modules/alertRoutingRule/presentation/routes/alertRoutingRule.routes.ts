import { Router } from "express";

import container from "@/config/inversify.config";
import { TYPES } from "@/config/types";

import { authMiddleware } from "@/app/middlewares/authMiddleware";

import { AlertRoutingRuleController } from "../controllers/AlertRoutingRuleController";

const router = Router();

const alertRoutingRuleController = container.get<AlertRoutingRuleController>(TYPES.AlertRoutingRuleController,);

router.route("/")
    .post(authMiddleware, alertRoutingRuleController.create.bind(alertRoutingRuleController))
    .get(authMiddleware, alertRoutingRuleController.getAll.bind(alertRoutingRuleController));

router.route("/:id")
    .get(authMiddleware, alertRoutingRuleController.getById.bind(alertRoutingRuleController))
    .put(authMiddleware, alertRoutingRuleController.update.bind(alertRoutingRuleController))
    .delete(authMiddleware, alertRoutingRuleController.delete.bind(alertRoutingRuleController));

export default router;