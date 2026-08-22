import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { authMiddleware } from "@/app/middlewares/authMiddleware";

export function createTaskRoutes(taskController: TaskController) {
    const router = Router();

    router.post("/", authMiddleware, taskController.createTask.bind(taskController));
    router.get("/my", authMiddleware, taskController.getMyTasks.bind(taskController));
    router.get("/incident/:incidentId", authMiddleware, taskController.getTasksByIncident.bind(taskController));
    router.patch("/:taskId/status", authMiddleware, taskController.updateStatus.bind(taskController));
    router.patch("/:taskId/assign", authMiddleware, taskController.assignTask.bind(taskController));
    router.delete("/:taskId", authMiddleware, taskController.deleteTask.bind(taskController));
    router.put("/:taskId", authMiddleware, taskController.updateTask.bind(taskController));
    router.get("/:taskId",authMiddleware,taskController.getTaskById.bind(taskController));

    return router;
}