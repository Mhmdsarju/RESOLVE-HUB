import { Router } from "express";
import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { TeamInvitationController } from "../controllers/TeamInvitationController";

export function createTeamInvitationRoutes(controller: TeamInvitationController) {
    const router = Router();

    router.post("/teams/:teamId/invitations", authMiddleware, controller.create.bind(controller));
    router.post("/team-invitations/accept/:token", controller.accept.bind(controller));
    router.get("/teams/:teamId/invitations", authMiddleware, controller.getAll.bind(controller));
    router.delete("/team-invitations/:id", authMiddleware, controller.cancel.bind(controller));

    return router;
}