import { Router } from "express";
import { authMiddleware } from "../../../../app/middlewares/authMiddleware";
import { OrganizationController } from "../controllers/OrganizationController";

export function createOrganizationRoutes(organizationController: OrganizationController) {
    const router = Router();

    router.use(authMiddleware);


    router.get("/me", organizationController.getProfile.bind(organizationController));
    router.put("/me", organizationController.updateProfile.bind(organizationController));
    router.post("/me/submit-verification", organizationController.submitVerification.bind(organizationController));
    router.get("/me/verification", organizationController.getVerificationStatus.bind(organizationController));

    return router;
}