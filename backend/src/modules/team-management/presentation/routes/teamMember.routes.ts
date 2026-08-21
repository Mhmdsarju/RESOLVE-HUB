import { Router } from "express";
import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { TeamMemberController } from "../controllers/TeamMemberController";

export function createTeamMemberRoutes(teamMemberController: TeamMemberController) {
    const router = Router();

    router.post("/:teamId/members", authMiddleware, teamMemberController.addMember.bind(teamMemberController));
    router.get("/:teamId/members", authMiddleware, teamMemberController.getMembers.bind(teamMemberController));
    router.patch("/:teamId/members/:memberId", authMiddleware, teamMemberController.updateRole.bind(teamMemberController));
    router.delete("/:teamId/members/:memberId", authMiddleware, teamMemberController.removeMember.bind(teamMemberController));
    router.get("/me/teams", authMiddleware, teamMemberController.getMyTeams.bind(teamMemberController));

    return router;
}