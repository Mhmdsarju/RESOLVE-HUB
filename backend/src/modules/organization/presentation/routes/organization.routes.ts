import { Router } from "express";
import { authMiddleware } from "../../../../app/middlewares/authMiddleware";
import { OrganizationController } from "../controllers/OrganizationController";

export function createOrganizationRoutes(organizationController: OrganizationController) {
    const router = Router();

    router.get("/me", authMiddleware, organizationController.getProfile.bind(organizationController));
    router.put("/me", authMiddleware, organizationController.updateProfile.bind(organizationController));
    router.post("/me/submit-verification", authMiddleware, organizationController.submitVerification.bind(organizationController));
    router.get("/me/verification", authMiddleware, organizationController.getVerificationStatus.bind(organizationController));

    return router;
}