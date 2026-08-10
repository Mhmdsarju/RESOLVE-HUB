import { Router } from "express";

import container from "@/config/inversify.config";
import { TYPES } from "@/config/types";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { MonitoringProjectController } from "../controllers/MonitoringProjectController";

const router = Router();

const controller = container.get<MonitoringProjectController>(TYPES.MonitoringProjectController);


router.post("/", authMiddleware, controller.create.bind(controller));
router.get("/", authMiddleware, controller.getAll.bind(controller));
router.get("/:id", authMiddleware, controller.getById.bind(controller));
router.put("/:id", authMiddleware, controller.update.bind(controller));
router.delete("/monitoring-projects/:id", authMiddleware, controller.delete.bind(controller));

export default router;