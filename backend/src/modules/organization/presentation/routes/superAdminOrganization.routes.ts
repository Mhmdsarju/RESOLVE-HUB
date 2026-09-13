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
    router.get("/", controller.getSuperAdminOrganizations.bind(controller));
    router.get("/analytics", controller.getOrganizationAnalytics.bind(controller));
    router.get("/revenue-analytics", controller.getRevenueAnalytics.bind(controller));
    router.get("/payment-history", controller.getPaymentHistory.bind(controller));
    router.get("/payment-history/export", controller.exportPaymentReport.bind(controller));
    router.get("/dashboard", controller.getSuperAdminDashboard.bind(controller));
    
    return router;
}