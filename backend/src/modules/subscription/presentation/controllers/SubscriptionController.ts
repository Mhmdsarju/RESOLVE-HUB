import { Request, Response, NextFunction } from "express";

import { BaseController } from "@/shared/base/controllers/BaseController";
import { ResponseHandler } from "@/shared/response/response-handler";

import { ICreateFreeSubscriptionUseCase } from "../../domain/interface/use-cases/ICreateFreeSubscriptionUseCase";
import { IGetSubscriptionUseCase } from "../../domain/interface/use-cases/IGetSubscriptionUseCase";
import { IUpgradeSubscriptionUseCase } from "../../domain/interface/use-cases/IUpgradeSubscriptionUseCase";
import { ICheckSubscriptionAccessUseCase } from "../../domain/interface/use-cases/ICheckSubscriptionAccessUseCase";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

export class SubscriptionController extends BaseController {
    constructor(
        private readonly createFreeSubscriptionUseCase: ICreateFreeSubscriptionUseCase,
        private readonly getSubscriptionUseCase: IGetSubscriptionUseCase,
        private readonly upgradeSubscriptionUseCase: IUpgradeSubscriptionUseCase,
        private readonly checkSubscriptionAccessUseCase: ICheckSubscriptionAccessUseCase,
    ) {
        super();
    }

    async createFree(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);

            if (!currentUser.organizationId) {
                throw new AppError("Organization ID is required", HttpStatusCode.BAD_REQUEST);
            }

            const subscription = await this.createFreeSubscriptionUseCase.execute(
                currentUser.organizationId,
            );

            return ResponseHandler.success(
                res,
                "Free subscription created successfully",
                subscription,
            );
        } catch (error) {
            next(error);
        }
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);

            if (!currentUser.organizationId) {
                throw new AppError("Organization ID is required", HttpStatusCode.BAD_REQUEST);
            }

            const subscription = await this.getSubscriptionUseCase.execute(
                currentUser.organizationId,
            );

            return ResponseHandler.success(
                res,
                "Subscription fetched successfully",
                subscription,
            );
        } catch (error) {
            next(error);
        }
    }

    async upgrade(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);

            if (!currentUser.organizationId) {
                throw new AppError("Organization ID is required", HttpStatusCode.BAD_REQUEST);
            }

            const subscription = await this.upgradeSubscriptionUseCase.execute(
                currentUser.organizationId,
                req.body.planId,
            );

            return ResponseHandler.success(
                res,
                "Subscription upgraded successfully",
                subscription,
            );
        } catch (error) {
            next(error);
        }
    }

    async checkAccess(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);

            if (!currentUser.organizationId) {
                throw new AppError("Organization ID is required", HttpStatusCode.BAD_REQUEST);
            }

            const result = await this.checkSubscriptionAccessUseCase.execute(
                currentUser.organizationId,
            );

            return ResponseHandler.success(
                res,
                "Subscription access checked successfully",
                result,
            );
        } catch (error) {
            next(error);
        }
    }
}