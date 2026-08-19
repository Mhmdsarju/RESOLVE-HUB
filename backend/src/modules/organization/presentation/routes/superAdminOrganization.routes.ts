import { Router } from "express";

import container from "../../../../config/inversify.config";
import { TYPES } from "../../../../config/types";

import { SuperAdminOrganizationController } from "../controllers/SuperAdminOrganizationController";
import { authMiddleware } from "@/app/middlewares/authMiddleware";

const router = Router();

const controller = container.get<SuperAdminOrganizationController>(TYPES.SuperAdminOrganizationController,);

router.post("/:organizationId/approve", authMiddleware, controller.approveOrganization.bind(controller),);

router.post("/:organizationId/reject", authMiddleware, controller.rejectOrganization.bind(controller),);

router.get("/pending-verification", authMiddleware, controller.getPendingVerifications.bind(controller),);

router.get("/:organizationId/verification", authMiddleware, controller.getVerificationDetails.bind(controller),);

export default router;