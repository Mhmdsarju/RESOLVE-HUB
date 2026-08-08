import { Router } from "express";

import container from "@/config/inversify.config";
import { TYPES } from "@/config/types";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { TeamInvitationController } from "../controllers/TeamInvitationController";

const router = Router();

const controller = container.get<TeamInvitationController>(TYPES.TeamInvitationController);

router.post("/teams/:teamId/invitations", authMiddleware, controller.create.bind(controller));
router.post("/team-invitations/accept/:token", controller.accept.bind(controller));
router.get("/teams/:teamId/invitations",authMiddleware,controller.getAll.bind(controller));
router.delete("/team-invitations/:id",authMiddleware,controller.cancel.bind(controller));

export default router;