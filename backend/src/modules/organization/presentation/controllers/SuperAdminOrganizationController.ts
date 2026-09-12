import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { ErrorMessages } from "../../../../shared/constant/ErrorMessages";
import { ResponseHandler } from "../../../../shared/response/response-handler";

import { IApproveOrganizationVerificationUseCase } from "../../domain/interfaces/IApproveOrganizationVerificationUseCase";
import { IRejectOrganizationVerificationUseCase } from "../../domain/interfaces/IRejectOrganizationVerificationUseCase";
import { IGetPendingOrganizationVerificationsUseCase } from "../../domain/interfaces/IGetPendingOrganizationVerificationsUseCase";
import { IGetOrganizationVerificationDetailsUseCase } from "../../domain/interfaces/IGetOrganizationVerificationDetailsUseCase";
import { IGetOrganizationAnalyticsUseCase } from "../../domain/interfaces/IGetOrganizationAnalyticsUseCase";
import { IGetSuperAdminOrganizationsUseCase } from "../../domain/interfaces/IGetSuperAdminOrganizationsUseCase";

export class SuperAdminOrganizationController {
    constructor(
        private readonly approveOrganizationVerificationUseCase: IApproveOrganizationVerificationUseCase,
        private readonly rejectOrganizationVerificationUseCase: IRejectOrganizationVerificationUseCase,
        private readonly getPendingOrganizationVerificationsUseCase: IGetPendingOrganizationVerificationsUseCase,
        private readonly getOrganizationVerificationDetailsUseCase: IGetOrganizationVerificationDetailsUseCase,
        private readonly getOrganizationAnalyticsUseCase: IGetOrganizationAnalyticsUseCase,
        private readonly getSuperAdminOrganizationsUseCase: IGetSuperAdminOrganizationsUseCase,
    ) { }

    async approveOrganization(req: Request, res: Response, next: NextFunction,) {
        try {
            const user = req.user;

            if (!user) {
                throw new AppError(ErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED,);
            }

            if (user.role !== "SUPER_ADMIN") {
                throw new AppError("You do not have permission to perform this action", HttpStatusCode.FORBIDDEN,);
            }

            const { organizationId } = req.params;

            const result = await this.approveOrganizationVerificationUseCase.execute(
                organizationId,
                user.userId,
            );

            return ResponseHandler.success(
                res,
                "Organization approved successfully",
                result,
            );
        } catch (error) {
            next(error);
        }
    }

    async rejectOrganization(req: Request, res: Response, next: NextFunction,) {
        try {
            const user = req.user;

            if (!user) {
                throw new AppError(ErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED,);
            }

            if (user.role !== "SUPER_ADMIN") {
                throw new AppError(ErrorMessages.FORBIDDEN, HttpStatusCode.FORBIDDEN,);
            }

            const { organizationId } = req.params;

            const { reason } = req.body;

            const result = await this.rejectOrganizationVerificationUseCase.execute(
                organizationId,
                user.userId,
                reason,
            );

            return ResponseHandler.success(
                res,
                "Organization rejected successfully",
                result,
            );
        } catch (error) {
            next(error);
        }
    }

    async getPendingVerifications(req: Request, res: Response, next: NextFunction,) {
        try {
            const user = req.user;

            if (!user) {
                throw new AppError(ErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED,);
            }

            if (user.role !== "SUPER_ADMIN") {
                throw new AppError(ErrorMessages.FORBIDDEN, HttpStatusCode.FORBIDDEN,);
            }

            const result = await this.getPendingOrganizationVerificationsUseCase.execute();

            return ResponseHandler.success(
                res,
                "Pending organization verifications fetched successfully",
                result,
            );
        } catch (error) {
            next(error);
        }
    }

    async getVerificationDetails(req: Request, res: Response, next: NextFunction,) {
        try {
            const user = req.user;

            if (!user) {
                throw new AppError(ErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED,);
            }

            if (user.role !== "SUPER_ADMIN") {
                throw new AppError(ErrorMessages.FORBIDDEN, HttpStatusCode.FORBIDDEN,);
            }

            const { organizationId } = req.params;

            const result = await this.getOrganizationVerificationDetailsUseCase.execute(organizationId,);

            return ResponseHandler.success(
                res,
                "Organization verification details fetched successfully",
                result,
            );
        } catch (error) {
            next(error);
        }


    }

    async getOrganizationAnalytics(req: Request, res: Response, next: NextFunction,) {
        try {
            const user = req.user;

            if (!user) {
                throw new AppError(ErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED,);
            }

            if (user.role !== "SUPER_ADMIN") {
                throw new AppError(ErrorMessages.FORBIDDEN, HttpStatusCode.FORBIDDEN,);
            }

            const result = await this.getOrganizationAnalyticsUseCase.execute();

            return ResponseHandler.success(
                res,
                "Organization analytics fetched successfully",
                result,
            );
        } catch (error) {
            next(error);
        }
    }

    async getSuperAdminOrganizations(req: Request, res: Response, next: NextFunction,) {
        try {
            const user = req.user;

            if (!user) {
                throw new AppError(ErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED,);
            }

            if (user.role !== "SUPER_ADMIN") {
                throw new AppError(ErrorMessages.FORBIDDEN, HttpStatusCode.FORBIDDEN,);
            }

            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;
            const search = req.query.search as string | undefined;
            const status = req.query.status as string | undefined;

            const result = await this.getSuperAdminOrganizationsUseCase.execute({
                page,
                limit,
                search,
                status,
            });

            return ResponseHandler.success(
                res,
                "Organizations fetched successfully",
                result,
            );
        } catch (error) {
            next(error);
        }
    }





}