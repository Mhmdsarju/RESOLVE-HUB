import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createTaskRoutes(taskController: TaskController) {
    const router = Router();

    router.use(authMiddleware);
    router.use(organizationAccessMiddleware);

    router.post("/", taskController.createTask.bind(taskController));
    router.get("/my", taskController.getMyTasks.bind(taskController));
    router.get("/incident/:incidentId", taskController.getTasksByIncident.bind(taskController));
    router.patch("/:taskId/status", taskController.updateStatus.bind(taskController));
    router.patch("/:taskId/assign", taskController.assignTask.bind(taskController));
    router.delete("/:taskId", taskController.deleteTask.bind(taskController));
    router.put("/:taskId", taskController.updateTask.bind(taskController));
    router.get("/:taskId", taskController.getTaskById.bind(taskController));

    return router;
}