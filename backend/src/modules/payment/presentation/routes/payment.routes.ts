import { Router } from "express";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { PaymentController } from "../controllers/PaymentController";

export function createPaymentRoutes(paymentController: PaymentController) {
    const router = Router();

    router.post(
        "/",
        authMiddleware,
        paymentController.create.bind(paymentController),
    );

    router.get(
        "/",
        authMiddleware,
        paymentController.getAll.bind(paymentController),
    );

    router.get(
        "/:id",
        authMiddleware,
        paymentController.getById.bind(paymentController),
    );

    router.post(
        "/:id/process",
        authMiddleware,
        paymentController.process.bind(paymentController),
    );

    return router;
}