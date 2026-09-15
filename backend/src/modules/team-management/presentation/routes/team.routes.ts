import { Router } from "express";
import { authMiddleware } from "../../../../app/middlewares/authMiddleware";
import { TeamController } from "../controllers/TeamController";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createTeamRoutes(teamController: TeamController) {
    const router = Router();

    router.post("/", authMiddleware,organizationAccessMiddleware,teamController.create.bind(teamController));
    router.get("/", authMiddleware,organizationAccessMiddleware,teamController.getAll.bind(teamController));
    router.get("/:id", authMiddleware,organizationAccessMiddleware,teamController.getById.bind(teamController));
    router.put("/:id", authMiddleware,organizationAccessMiddleware,teamController.update.bind(teamController));
    router.delete("/:id", authMiddleware,organizationAccessMiddleware,teamController.delete.bind(teamController));

    return router;
}