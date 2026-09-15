import { Router } from "express";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { SubscriptionController } from "../controllers/SubscriptionController"; 

export function createSubscriptionRoutes(subscriptionController: SubscriptionController) {
    const router = Router();

    router.post(
        "/free",
        authMiddleware,
        subscriptionController.createFree.bind(subscriptionController),
    );

    router.get(
        "/",
        authMiddleware,
        subscriptionController.get.bind(subscriptionController),
    );

    router.post(
        "/upgrade",
        authMiddleware,
        subscriptionController.upgrade.bind(subscriptionController),
    );

    router.get(
        "/access",
        authMiddleware,
        subscriptionController.checkAccess.bind(subscriptionController),
    );

    return router;
}