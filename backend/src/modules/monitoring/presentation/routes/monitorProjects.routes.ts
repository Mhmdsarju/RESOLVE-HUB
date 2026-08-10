import { Router } from "express";

import container from "@/config/inversify.config";
import { TYPES } from "@/config/types";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { MonitoringProjectController } from "../controllers/MonitoringProjectController";

const router = Router();

const controller = container.get<MonitoringProjectController>(TYPES.MonitoringProjectController);


router.route("/")
  .post(authMiddleware, controller.create.bind(controller))
  .get(authMiddleware, controller.getAll.bind(controller));

router.route("/:id")
  .get(authMiddleware, controller.getById.bind(controller))
  .put(authMiddleware, controller.update.bind(controller))
  .delete(authMiddleware, controller.delete.bind(controller));

export default router;