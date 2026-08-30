import { Router } from "express";

import { AuditLogController } from "../controller/AuditLogController";

import { authMiddleware } from "@/app/middlewares/authMiddleware";

export function createAuditLogRoutes(
    auditLogController: AuditLogController,
) {
    const router = Router();

    router.get("/", authMiddleware, auditLogController.getByOrganization.bind(auditLogController),);

    return router;
}