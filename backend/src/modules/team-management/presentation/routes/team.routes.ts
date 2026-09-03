import { Router } from "express";
import { authMiddleware } from "../../../../app/middlewares/authMiddleware";
import { TeamController } from "../controllers/TeamController";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createTeamRoutes(teamController: TeamController) {
    const router = Router();

    router.use(authMiddleware);
    router.use(organizationAccessMiddleware);

    router.post("/", teamController.create.bind(teamController));
    router.get("/", teamController.getAll.bind(teamController));
    router.get("/:id", teamController.getById.bind(teamController));
    router.put("/:id", teamController.update.bind(teamController));
    router.delete("/:id", teamController.delete.bind(teamController));

    return router;
}