import { Router } from "express";

import container from "../../../../config/inversify.config";
import { TYPES } from "@/config/types";
import { TaskController } from "../controllers/TaskController";



const router = Router();

const taskController = container.get<TaskController>(TYPES.TaskController);

router.post("/", taskController.createTask.bind(taskController));
router.get("/incident/:incidentId",taskController.getTasksByIncident.bind(taskController));
router.patch("/:taskId/status",taskController.updateStatus.bind(taskController));
router.patch("/:taskId/assign",taskController.assignTask.bind(taskController));
router.delete("/:taskId",taskController.deleteTask.bind(taskController));
router.put("/:taskId",taskController.updateTask.bind(taskController));

export default router;