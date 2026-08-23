import { Router } from "express";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import upload from "@/config/multer";

import { FileController } from "../controller/FileController";

export function createFileRoutes(fileController: FileController) {
    const router = Router();

    router.route("/tasks/:taskId/files")
        .post(
            authMiddleware,
            upload.single("file"),
            fileController.upload.bind(fileController),
        )
        .get(
            authMiddleware,
            fileController.getByTask.bind(fileController),
        );

    router.get("/files/:id", authMiddleware, fileController.getById.bind(fileController),);

    router.delete("/files/:id", authMiddleware, fileController.delete.bind(fileController),);

    return router;
}