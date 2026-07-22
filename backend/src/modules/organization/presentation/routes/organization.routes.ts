import { Router } from "express";
import { OrganizationController } from "../controllers/OrganizationController";
import { authMiddleware } from "../../../../app/middlewares/authMiddleware";

export const createOrganizationRoutes = (
  organizationController: OrganizationController
) => {
  const router = Router();

  router.get("/me", authMiddleware, organizationController.getProfile.bind(organizationController));
  router.put("/me", authMiddleware, organizationController.updateProfile.bind(organizationController));

  return router;
};