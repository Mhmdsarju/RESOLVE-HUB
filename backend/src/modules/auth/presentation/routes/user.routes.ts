import { Router } from "express";

import container from "@/config/inversify.config";
import { TYPES } from "@/config/types";

import { authMiddleware } from "@/app/middlewares/authMiddleware";

import { UserController } from "../controllers/UserController";

const router = Router();

const userController = container.get<UserController>(TYPES.UserController,);

router.get("/", authMiddleware, userController.getUsers.bind(userController),);

export default router;