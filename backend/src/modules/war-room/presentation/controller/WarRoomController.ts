import { Request, Response, NextFunction } from "express";

import { BaseController } from "@/shared/base/controllers/BaseController";
import { ResponseHandler } from "@/shared/response/response-handler";

import { ICreateWarRoomUseCase } from "../../domain/interface/usecase/ICreateWarRoomUseCase";
import { IGetWarRoomsUseCase } from "../../domain/interface/usecase/IGetWarRoomsUseCase";
import { IGetWarRoomByIdUseCase } from "../../domain/interface/usecase/IGetWarRoomByIdUseCase";
import { ICloseWarRoomUseCase } from "../../domain/interface/usecase/ICloseWarRoomUseCase";
import { IJoinWarRoomUseCase } from "../../domain/interface/usecase/IJoinWarRoomUseCase";
import { ILeaveWarRoomUseCase } from "../../domain/interface/usecase/ILeaveWarRoomUseCase";

import { GetWarRoomsDto } from "../../application/dto/getWarRoomsDto";
import { WarRoomStatus } from "../../domain/enums/warRoomStatus.enum";

export class WarRoomController extends BaseController {
    constructor(
        private readonly createWarRoomUseCase: ICreateWarRoomUseCase,
        private readonly getWarRoomsUseCase: IGetWarRoomsUseCase,
        private readonly getWarRoomByIdUseCase: IGetWarRoomByIdUseCase,
        private readonly closeWarRoomUseCase: ICloseWarRoomUseCase,
        private readonly joinWarRoomUseCase: IJoinWarRoomUseCase,
        private readonly leaveWarRoomUseCase: ILeaveWarRoomUseCase
    ) {
        super();
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);

            const dto = {
                incidentId: req.body.incidentId,
            };

            const warRoom = await this.createWarRoomUseCase.execute(dto, currentUser.userId);

            return ResponseHandler.success(
                res,
                "War room created successfully",
                warRoom
            );
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);

            const dto: GetWarRoomsDto = {
                page: Number(req.query.page) || 1,
                limit: Number(req.query.limit) || 6,
                organizationId: currentUser.organizationId,
                status: req.query.status as WarRoomStatus | undefined,
                search: req.query.search as string | undefined,
            };

            const result = await this.getWarRoomsUseCase.execute(dto, currentUser.userId);

            return ResponseHandler.success(
                res,
                "War rooms fetched successfully",
                result
            );
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);

            const warRoom = await this.getWarRoomByIdUseCase.execute(req.params.id, currentUser.userId);

            return ResponseHandler.success(
                res,
                "War room fetched successfully",
                warRoom
            );
        } catch (error) {
            next(error);
        }
    }

    async close(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);

            const warRoom = await this.closeWarRoomUseCase.execute(req.params.id, currentUser.userId);

            return ResponseHandler.success(
                res,
                "War room closed successfully",
                warRoom
            );
        } catch (error) {
            next(error);
        }
    }

    async join(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);

            const warRoom = await this.joinWarRoomUseCase.execute(req.params.id, currentUser.userId,currentUser.role);

            return ResponseHandler.success(
                res,
                "Joined war room successfully",
                warRoom
            );
        } catch (error) {
            next(error);
        }
    }

    async leave(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);

            await this.leaveWarRoomUseCase.execute(req.params.id, currentUser.userId,currentUser.role);

            return ResponseHandler.success(
                res,
                "Left war room successfully",
                null
            );
        } catch (error) {
            next(error);
        }
    }
}