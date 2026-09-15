import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createTaskRoutes(taskController: TaskController) {
    const router = Router();


    router.post("/",authMiddleware,organizationAccessMiddleware, taskController.createTask.bind(taskController));
    router.get("/my",authMiddleware,organizationAccessMiddleware, taskController.getMyTasks.bind(taskController));
    router.get("/incident/:incidentId",authMiddleware,organizationAccessMiddleware, taskController.getTasksByIncident.bind(taskController));
    router.patch("/:taskId/status",authMiddleware,organizationAccessMiddleware, taskController.updateStatus.bind(taskController));
    router.patch("/:taskId/assign",authMiddleware,organizationAccessMiddleware, taskController.assignTask.bind(taskController));
    router.delete("/:taskId",authMiddleware,organizationAccessMiddleware, taskController.deleteTask.bind(taskController));
    router.put("/:taskId",authMiddleware,organizationAccessMiddleware, taskController.updateTask.bind(taskController));
    router.get("/:taskId",authMiddleware,organizationAccessMiddleware, taskController.getTaskById.bind(taskController));

    return router;
}