import { Router } from "express";
import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { TeamMemberController } from "../controllers/TeamMemberController";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createTeamMemberRoutes(teamMemberController: TeamMemberController) {
    const router = Router();

    router.post("/:teamId/members", authMiddleware,organizationAccessMiddleware, teamMemberController.addMember.bind(teamMemberController));
    router.get("/:teamId/members", authMiddleware,organizationAccessMiddleware, teamMemberController.getMembers.bind(teamMemberController));
    router.patch("/:teamId/members/:memberId", authMiddleware,organizationAccessMiddleware, teamMemberController.updateRole.bind(teamMemberController));
    router.delete("/:teamId/members/:memberId", authMiddleware,organizationAccessMiddleware, teamMemberController.removeMember.bind(teamMemberController));
    router.get("/me/teams", authMiddleware,organizationAccessMiddleware, teamMemberController.getMyTeams.bind(teamMemberController));

    return router;
}