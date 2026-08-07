import { Router } from "express";

import container from "@/config/inversify.config";
import { TYPES } from "@/config/types";

import { authMiddleware } from "@/app/middlewares/authMiddleware";

import { TeamMemberController } from "../controllers/TeamMemberController";

const teamMemberController = container.get<TeamMemberController>(
    TYPES.TeamMemberController
);

const router = Router();

router.post("/:teamId/members", authMiddleware, teamMemberController.addMember.bind(teamMemberController));
router.get("/:teamId/members", authMiddleware, teamMemberController.getMembers.bind(teamMemberController));
router.patch("/:teamId/members/:memberId", authMiddleware, teamMemberController.updateRole.bind(teamMemberController));
export default router;