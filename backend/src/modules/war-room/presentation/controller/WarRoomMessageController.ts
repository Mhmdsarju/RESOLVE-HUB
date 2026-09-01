import { Request, Response, NextFunction } from "express";

import { BaseController } from "@/shared/base/controllers/BaseController";
import { ResponseHandler } from "@/shared/response/response-handler";

import { IGetWarRoomMessagesUseCase } from "../../domain/interface/usecase/IGetWarRoomMessagesUseCase";

export class WarRoomMessageController extends BaseController {

    constructor(
        private readonly getWarRoomMessagesUseCase: IGetWarRoomMessagesUseCase,
    ) {
        super();
    }

    async getMessages(req: Request, res: Response, next: NextFunction,) {
        try {

            const user = this.getCurrentUser(req);

            const page = Number(req.query.page) || 1;

            const limit = Number(req.query.limit) || 50;

            const messages = await this.getWarRoomMessagesUseCase.execute(
                req.params.id,
                user.userId,
                page,
                limit,
            );

            return ResponseHandler.success(
                res,
                "War room messages fetched successfully",
                messages,
            );

        } catch (error) {
            next(error);
        }
    }
}