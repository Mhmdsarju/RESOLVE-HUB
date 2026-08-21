import { Router } from "express";
import { authMiddleware } from "../../../../app/middlewares/authMiddleware";
import { TeamController } from "../controllers/TeamController";

export function createTeamRoutes(teamController: TeamController) {
    const router = Router();

    router.post("/", authMiddleware, teamController.create.bind(teamController));
    router.get("/", authMiddleware, teamController.getAll.bind(teamController));
    router.get("/:id", authMiddleware, teamController.getById.bind(teamController));
    router.put("/:id", authMiddleware, teamController.update.bind(teamController));
    router.delete("/:id", authMiddleware, teamController.delete.bind(teamController));

    return router;
}