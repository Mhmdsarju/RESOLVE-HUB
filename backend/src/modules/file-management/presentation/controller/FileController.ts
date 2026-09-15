import { NextFunction, Request, Response } from "express";

import { ResponseHandler } from "@/shared/response/response-handler";
import { BaseController } from "@/shared/base/controllers/BaseController";

import { IUploadFileUseCase } from "../../domain/interface/usecase/IUploadFileUseCase";
import { IGetFileByIdUseCase } from "../../domain/interface/usecase/IGetFileByIdUseCase";
import { IGetFilesByTaskUseCase } from "../../domain/interface/usecase/IGetFilesByTaskUseCase";
import { IDeleteFileUseCase } from "../../domain/interface/usecase/IDeleteFileUseCase";
import { IDownloadFileUseCase } from "../../domain/interface/usecase/IDownloadFileUseCase";

import { UploadFileDTO } from "../../application/dto/uploadFileDto";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

export class FileController extends BaseController {
    constructor(
        private readonly uploadFileUseCase: IUploadFileUseCase,
        private readonly getFileByIdUseCase: IGetFileByIdUseCase,
        private readonly getFilesByTaskUseCase: IGetFilesByTaskUseCase,
        private readonly deleteFileUseCase: IDeleteFileUseCase,
        private readonly downloadFileUseCase: IDownloadFileUseCase,
    ) {
        super();
    }

    async upload(req: Request, res: Response, next: NextFunction,) {
        try {
            const user = this.getCurrentUser(req);

            if (!req.file) {
                return res.status(HttpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "File is required",
                });
            }

            const file = req.file;

            const dto: UploadFileDTO = {
                taskId: req.params.taskId,
                uploadedBy: user.userId,
                file: file.buffer,
                originalName: file.originalname,
                fileName: file.originalname,
                mimeType: file.mimetype,
                size: file.size,
            };

            const createdFile = await this.uploadFileUseCase.execute(dto);

            return ResponseHandler.success(
                res,
                "File uploaded successfully",
                createdFile,
            );
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction,) {
        try {
            const file = await this.getFileByIdUseCase.execute(
                req.params.id,
            );

            return ResponseHandler.success(
                res,
                "File fetched successfully",
                file,
            );
        } catch (error) {
            next(error);
        }
    }

    async getByTask(req: Request, res: Response, next: NextFunction,) {
        try {
            const files = await this.getFilesByTaskUseCase.execute(
                req.params.taskId,
            );

            return ResponseHandler.success(
                res,
                "Task files fetched successfully",
                files,
            );
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction,) {
        try {
            await this.deleteFileUseCase.execute(
                req.params.id,
            );

            return ResponseHandler.success(
                res,
                "File deleted successfully",
            );
        } catch (error) {
            next(error);
        }
    }

    async download(req: Request, res: Response, next: NextFunction,) {
        try {
            const file = await this.getFileByIdUseCase.execute(req.params.id,);

            const buffer = await this.downloadFileUseCase.execute(req.params.id,);

            res.setHeader("Content-Type", file.mimeType,);

            res.setHeader(
                "Content-Disposition",
                `attachment; filename="${encodeURIComponent(file.originalName)}"`,
            );

            return res.send(buffer);
        } catch (error) {
            next(error);
        }
    }
}