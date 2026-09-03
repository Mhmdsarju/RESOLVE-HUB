import { Router } from "express";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import upload from "@/config/multer";

import { FileController } from "../controller/FileController";
// import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";

export function createFileRoutes(fileController: FileController) {
    const router = Router();

    router.use(authMiddleware);
    

    router.route("/tasks/:taskId/files")
        .post(
            upload.single("file"),
            fileController.upload.bind(fileController),
        )
        .get(
            fileController.getByTask.bind(fileController),
        );

    router.get("/files/:id", fileController.getById.bind(fileController),);
    router.get("/files/:id/download", fileController.download.bind(fileController),);
    router.delete("/files/:id", fileController.delete.bind(fileController),);

    return router;
}