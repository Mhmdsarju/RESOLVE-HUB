import { Router } from "express";

import { AuditLogController } from "../controller/AuditLogController";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createAuditLogRoutes(auditLogController: AuditLogController,) {
    const router = Router();
    router.use(authMiddleware);
    router.use(organizationAccessMiddleware);
    router.get("/", auditLogController.getByOrganization.bind(auditLogController),);

    return router;
}