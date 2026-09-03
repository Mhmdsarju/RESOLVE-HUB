import { Router } from "express";
import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { MonitoringProjectController } from "../controllers/MonitoringProjectController";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createMonitoringProjectRoutes(controller: MonitoringProjectController) {
    const router = Router();
    router.use(authMiddleware);
    router.use(organizationAccessMiddleware);

    router.route("/")
        .post(authMiddleware, controller.create.bind(controller))
        .get(authMiddleware, controller.getAll.bind(controller));

    router.route("/:id")
        .get(authMiddleware, controller.getById.bind(controller))
        .put(authMiddleware, controller.update.bind(controller))
        .delete(authMiddleware, controller.delete.bind(controller));

    return router;
}