import { Router } from "express";

import { SuperAdminOrganizationController } from "../controllers/SuperAdminOrganizationController";
import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { roleMiddleware } from "@/app/middlewares/roleMiddleware";

export function createSuperAdminOrganizationRoutes(controller: SuperAdminOrganizationController) {
    const router = Router();

    const role = roleMiddleware("SUPER_ADMIN");

    router.post("/:organizationId/approve", authMiddleware, role, controller.approveOrganization.bind(controller));
    router.post("/:organizationId/reject", authMiddleware, role, controller.rejectOrganization.bind(controller));
    router.get("/pending-verification", authMiddleware, role, controller.getPendingVerifications.bind(controller));
    router.get("/:organizationId/verification", authMiddleware, role, controller.getVerificationDetails.bind(controller));
    router.get("/", authMiddleware, role, controller.getSuperAdminOrganizations.bind(controller));
    router.get("/analytics", authMiddleware, role, controller.getOrganizationAnalytics.bind(controller));
    router.get("/revenue-analytics", authMiddleware, role, controller.getRevenueAnalytics.bind(controller));
    router.get("/payment-history", authMiddleware, role, controller.getPaymentHistory.bind(controller));
    router.get("/payment-history/export", authMiddleware, role, controller.exportPaymentReport.bind(controller));
    router.get("/dashboard", authMiddleware, role, controller.getSuperAdminDashboard.bind(controller));
    
    return router;
}