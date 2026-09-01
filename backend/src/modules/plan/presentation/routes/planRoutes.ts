import { Router } from "express";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { PlanController } from "../controllers/PlanController";

export function createPlanRoutes(planController: PlanController) {
    const router = Router();

    router.post(
        "/",
        authMiddleware,
        planController.create.bind(planController),
    );

    router.get(
        "/",
        authMiddleware,
        planController.getAll.bind(planController),
    );

    router.patch(
        "/:id",
        authMiddleware,
        planController.update.bind(planController),
    );

    return router;
}