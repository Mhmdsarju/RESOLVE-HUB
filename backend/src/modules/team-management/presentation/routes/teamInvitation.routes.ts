import { Router } from "express";
import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { TeamInvitationController } from "../controllers/TeamInvitationController";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createTeamInvitationRoutes(controller: TeamInvitationController) {
    const router = Router();
   
    router.post("/teams/:teamId/invitations", authMiddleware, organizationAccessMiddleware, controller.create.bind(controller));
    router.post("/team-invitations/accept/:token", controller.accept.bind(controller));
    router.get("/teams/:teamId/invitations", authMiddleware, organizationAccessMiddleware, controller.getAll.bind(controller));
    router.delete("/team-invitations/:id", authMiddleware, organizationAccessMiddleware, controller.cancel.bind(controller));

    return router;
}