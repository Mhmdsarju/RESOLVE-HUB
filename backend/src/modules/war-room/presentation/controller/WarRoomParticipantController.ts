import { Request, Response, NextFunction } from "express";

import { BaseController } from "@/shared/base/controllers/BaseController";
import { ResponseHandler } from "@/shared/response/response-handler";

import { IGetWarRoomParticipantsUseCase } from "../../domain/interface/usecase/IGetWarRoomParticipantsUseCase";

export class WarRoomParticipantController extends BaseController {

    constructor(
        private readonly getWarRoomParticipantsUseCase: IGetWarRoomParticipantsUseCase,
    ) {
        super();
    }

    async getParticipants(req: Request, res: Response, next: NextFunction,) {
        try {

            this.getCurrentUser(req);

            const participants = await this.getWarRoomParticipantsUseCase.execute(req.params.id,);

            return ResponseHandler.success(
                res,
                "War room participants fetched successfully",
                participants,
            );

        } catch (error) {
            next(error);
        }
    }
}