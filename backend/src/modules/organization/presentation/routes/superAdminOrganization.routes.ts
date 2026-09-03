import { Router } from "express";

import { SuperAdminOrganizationController } from "../controllers/SuperAdminOrganizationController";
import { authMiddleware } from "@/app/middlewares/authMiddleware";

export function createSuperAdminOrganizationRoutes(controller: SuperAdminOrganizationController) {
    const router = Router();

    router.use(authMiddleware);

    router.post("/:organizationId/approve", controller.approveOrganization.bind(controller));
    router.post("/:organizationId/reject", controller.rejectOrganization.bind(controller));
    router.get("/pending-verification", controller.getPendingVerifications.bind(controller));
    router.get("/:organizationId/verification", controller.getVerificationDetails.bind(controller));

    return router;
}