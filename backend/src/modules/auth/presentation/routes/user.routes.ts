import { Router } from "express";

import { authMiddleware } from "@/app/middlewares/authMiddleware";

import { UserController } from "../controllers/UserController";

export function createUserRoutes(userController: UserController) {
    const router = Router();

    router.get("/me", authMiddleware, userController.getMe.bind(userController));
    router.patch("/me", authMiddleware, userController.updateMe.bind(userController));
    router.get("/:userId", authMiddleware, userController.getUserById.bind(userController),);
    router.get("/", authMiddleware, userController.getUsers.bind(userController));

    return router;
}