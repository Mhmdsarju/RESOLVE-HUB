import { Router } from "express";
import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { TeamMemberController } from "../controllers/TeamMemberController";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createTeamMemberRoutes(teamMemberController: TeamMemberController) {
    const router = Router();

    router.use(authMiddleware);
    router.use(organizationAccessMiddleware);

    router.post("/:teamId/members",  teamMemberController.addMember.bind(teamMemberController));
    router.get("/:teamId/members",  teamMemberController.getMembers.bind(teamMemberController));
    router.patch("/:teamId/members/:memberId",  teamMemberController.updateRole.bind(teamMemberController));
    router.delete("/:teamId/members/:memberId",  teamMemberController.removeMember.bind(teamMemberController));
    router.get("/me/teams",  teamMemberController.getMyTeams.bind(teamMemberController));

    return router;
}