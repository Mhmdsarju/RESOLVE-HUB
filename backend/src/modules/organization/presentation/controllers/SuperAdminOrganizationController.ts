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
import { IGetRevenueAnalyticsUseCase } from "../../domain/interfaces/IGetRevenueAnalyticsUseCase";
import { IGetPaymentHistoryUseCase } from "../../domain/interfaces/IGetPaymentHistoryUseCase";
import { IExportPaymentReportUseCase } from "../../domain/interfaces/IExportPaymentReportUseCase";
import { IGetSuperAdminDashboardUseCase } from "../../domain/interfaces/IGetSuperAdminDashboardUseCase";

export class SuperAdminOrganizationController {
    constructor(
        private readonly approveOrganizationVerificationUseCase: IApproveOrganizationVerificationUseCase,
        private readonly rejectOrganizationVerificationUseCase: IRejectOrganizationVerificationUseCase,
        private readonly getPendingOrganizationVerificationsUseCase: IGetPendingOrganizationVerificationsUseCase,
        private readonly getOrganizationVerificationDetailsUseCase: IGetOrganizationVerificationDetailsUseCase,
        private readonly getOrganizationAnalyticsUseCase: IGetOrganizationAnalyticsUseCase,
        private readonly getSuperAdminOrganizationsUseCase: IGetSuperAdminOrganizationsUseCase,
        private readonly getRevenueAnalyticsUseCase: IGetRevenueAnalyticsUseCase,
        private readonly getPaymentHistoryUseCase: IGetPaymentHistoryUseCase,
        private readonly exportPaymentReportUseCase: IExportPaymentReportUseCase,
        private readonly getSuperAdminDashboardUseCase: IGetSuperAdminDashboardUseCase,
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

    async getRevenueAnalytics(req: Request, res: Response, next: NextFunction,) {
        try {
            const user = req.user;

            if (!user) {
                throw new AppError(ErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED,);
            }

            if (user.role !== "SUPER_ADMIN") {
                throw new AppError(ErrorMessages.FORBIDDEN, HttpStatusCode.FORBIDDEN,);
            }

            const result = await this.getRevenueAnalyticsUseCase.execute();

            return ResponseHandler.success(
                res,
                "Revenue analytics fetched successfully",
                result,
            );
        } catch (error) {
            next(error);
        }
    }

    async getPaymentHistory(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const user = req.user;

            if (!user) {
                throw new AppError(
                    ErrorMessages.UNAUTHORIZED,
                    HttpStatusCode.UNAUTHORIZED,
                );
            }

            if (user.role !== "SUPER_ADMIN") {
                throw new AppError(
                    ErrorMessages.FORBIDDEN,
                    HttpStatusCode.FORBIDDEN,
                );
            }

            const page = Number(req.query.page) || 1;
            const limit = Number(req.query.limit) || 10;

            const search = req.query.search as string | undefined;
            const status = req.query.status as string | undefined;

            const period = req.query.period as
                | "MONTHLY"
                | "YEARLY"
                | "CUSTOM"
                | undefined;

            const year = req.query.year
                ? Number(req.query.year)
                : undefined;

            const month = req.query.month
                ? Number(req.query.month)
                : undefined;

            const startDate = req.query.startDate
                ? new Date(req.query.startDate as string)
                : undefined;

            const endDate = req.query.endDate
                ? new Date(req.query.endDate as string)
                : undefined;

            const result = await this.getPaymentHistoryUseCase.execute({
                page,
                limit,
                search,
                status,
                period,
                year,
                month,
                startDate,
                endDate,
            });

            return ResponseHandler.success(
                res,
                "Payment history fetched successfully",
                result,
            );
        } catch (error) {
            next(error);
        }
    }

    async exportPaymentReport(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const user = req.user;

            if (!user) {
                throw new AppError(
                    ErrorMessages.UNAUTHORIZED,
                    HttpStatusCode.UNAUTHORIZED,
                );
            }

            if (user.role !== "SUPER_ADMIN") {
                throw new AppError(
                    ErrorMessages.FORBIDDEN,
                    HttpStatusCode.FORBIDDEN,
                );
            }

            const period = req.query.period as
                | "MONTHLY"
                | "YEARLY"
                | "CUSTOM"
                | undefined;

            const year = req.query.year
                ? Number(req.query.year)
                : undefined;

            const month = req.query.month
                ? Number(req.query.month)
                : undefined;

            const startDate = req.query.startDate
                ? new Date(req.query.startDate as string)
                : undefined;

            const endDate = req.query.endDate
                ? new Date(req.query.endDate as string)
                : undefined;

            const document = await this.exportPaymentReportUseCase.execute({
                period,
                year,
                month,
                startDate,
                endDate,
            });

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=resolvehub-payment-report.pdf",
            );

            document.pipe(res);
            document.end();
        } catch (error) {
            next(error);
        }
    }

    async getSuperAdminDashboard(req: Request, res: Response, next: NextFunction,) {
        try {
            const user = req.user;

            if (!user) {
                throw new AppError(ErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED,);
            }

            if (user.role !== "SUPER_ADMIN") {
                throw new AppError(ErrorMessages.FORBIDDEN, HttpStatusCode.FORBIDDEN,);
            }

            const result = await this.getSuperAdminDashboardUseCase.execute();

            return ResponseHandler.success(
                res,
                "Super admin dashboard fetched successfully",
                result,
            );
        } catch (error) {
            next(error);
        }
    }





}