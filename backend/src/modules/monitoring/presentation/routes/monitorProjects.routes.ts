import { Router } from "express";
import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { MonitoringProjectController } from "../controllers/MonitoringProjectController";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createMonitoringProjectRoutes(controller: MonitoringProjectController) {
    const router = Router();

    router.route("/")
        .post(authMiddleware, organizationAccessMiddleware,controller.create.bind(controller))
        .get(authMiddleware, organizationAccessMiddleware,controller.getAll.bind(controller));

    router.route("/:id")
        .get(authMiddleware, organizationAccessMiddleware,controller.getById.bind(controller))
        .put(authMiddleware, organizationAccessMiddleware,controller.update.bind(controller))
        .delete(authMiddleware, organizationAccessMiddleware,controller.delete.bind(controller));

    return router;
}