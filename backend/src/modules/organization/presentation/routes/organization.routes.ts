import { Router } from "express";

import container from "../../../../config/inversify.config";
import { TYPES } from "../../../../config/types";

import { authMiddleware } from "../../../../app/middlewares/authMiddleware";
import { OrganizationController } from "../controllers/OrganizationController";

const organizationController = container.get<OrganizationController>(
  TYPES.OrganizationController
);

const router = Router();

router.get("/me", authMiddleware, organizationController.getProfile.bind(organizationController));

router.put("/me", authMiddleware, organizationController.updateProfile.bind(organizationController));

export default router;