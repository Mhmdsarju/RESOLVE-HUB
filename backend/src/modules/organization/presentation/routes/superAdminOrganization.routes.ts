import { Router } from "express";

import { SuperAdminOrganizationController } from "../controllers/SuperAdminOrganizationController";
import { authMiddleware } from "@/app/middlewares/authMiddleware";

export function createSuperAdminOrganizationRoutes(controller: SuperAdminOrganizationController) {
    const router = Router();

    router.post("/:organizationId/approve", authMiddleware, controller.approveOrganization.bind(controller));
    router.post("/:organizationId/reject", authMiddleware, controller.rejectOrganization.bind(controller));
    router.get("/pending-verification", authMiddleware, controller.getPendingVerifications.bind(controller));
    router.get("/:organizationId/verification", authMiddleware, controller.getVerificationDetails.bind(controller));

    return router;
}