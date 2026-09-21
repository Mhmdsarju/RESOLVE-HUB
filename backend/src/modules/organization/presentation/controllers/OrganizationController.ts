import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { ErrorMessages } from "../../../../shared/constant/ErrorMessages";
import { ResponseHandler } from "../../../../shared/response/response-handler";

import { IGetOrganizationProfileUseCase } from "../../domain/interfaces/IGetOrganizationProfileUseCase";
import { IUpdateOrganizationUseCase } from "../../domain/interfaces/IUpdateOrganizationUseCase";
import { ISubmitOrganizationVerificationUseCase } from "../../domain/interfaces/ISubmitOrganizationVerificationUseCase";
import { IGetOrganizationVerificationUseCase } from "../../domain/interfaces/IGetOrganizationVerificationUseCase";
import { IGetOrganizationDashboardStatsUseCase } from "../../domain/interfaces/IGetOrganizationDashboardStatsUseCase";
import { GetPaymentHistoryDTO } from "../../application/dto/GetPaymentHistoryDTO";
import { IGetOrgAdminPaymentHistoryUseCase } from "../../domain/interfaces/IGetOrgAdminPaymentHistoryUseCase";

export class OrganizationController {
  constructor(
    private readonly getOrganizationProfileUseCase: IGetOrganizationProfileUseCase,
    private readonly updateOrganizationUseCase: IUpdateOrganizationUseCase,
    private readonly submitOrganizationVerificationUseCase: ISubmitOrganizationVerificationUseCase,
    private readonly getOrganizationVerificationUseCase: IGetOrganizationVerificationUseCase,
    private readonly getOrganizationDashboardStatsUseCase: IGetOrganizationDashboardStatsUseCase,
    private readonly getOrgAdminPaymentHistoryUseCase: IGetOrgAdminPaymentHistoryUseCase,
  ) { }

  async getProfile(req: Request, res: Response, next: NextFunction,) {
    try {
      const user = req.user;

      if (!user) {
        throw new AppError(ErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED,);
      }

      if (!user.organizationId) {
        return ResponseHandler.success(
          res,
          "Organization fetched successfully",
          null,
        );
      }

      const organization = await this.getOrganizationProfileUseCase.execute(user.organizationId,);

      return ResponseHandler.success(
        res,
        "Organization fetched successfully",
        organization,
      );
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction,) {
    try {
      const user = req.user;

      if (!user) {
        throw new AppError(ErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED,);
      }

      if (!user.organizationId) {
        throw new AppError("Organization ID not found for this user", HttpStatusCode.BAD_REQUEST,);
      }

      const result = await this.updateOrganizationUseCase.execute(user.organizationId, req.body, user.userId);

      return ResponseHandler.success(
        res,
        "Organization updated successfully",
        result,
      );
    } catch (error) {
      next(error);
    }
  }

  async submitVerification(req: Request, res: Response, next: NextFunction,) {
    try {
      const user = req.user;

      if (!user) {
        throw new AppError(ErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED,);
      }

      if (!user.organizationId) {
        throw new AppError("Organization ID not found for this user", HttpStatusCode.BAD_REQUEST,);
      }

      const result = await this.submitOrganizationVerificationUseCase.execute(user.organizationId,);

      return ResponseHandler.success(
        res,
        "Organization submitted for verification successfully",
        result,
      );
    } catch (error) {
      next(error);
    }
  }

  async getVerificationStatus(req: Request, res: Response, next: NextFunction,) {
    try {
      const user = req.user;

      if (!user) {
        throw new AppError(ErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED,);
      }

      if (!user.organizationId) {
        throw new AppError("Organization ID not found for this user", HttpStatusCode.BAD_REQUEST,);
      }

      const verification = await this.getOrganizationVerificationUseCase.execute(user.organizationId,);

      return ResponseHandler.success(
        res,
        "Organization verification status fetched successfully",
        verification,
      );
    } catch (error) {
      next(error);
    }
  }

  async getDashboardStats(req: Request, res: Response, next: NextFunction,) {
    try {
      const user = req.user;

      if (!user) {
        throw new AppError(ErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED,);
      }

      if (!user.organizationId) {
        throw new AppError("Organization ID not found for this user", HttpStatusCode.BAD_REQUEST,);
      }

      const stats = await this.getOrganizationDashboardStatsUseCase.execute(
        user.organizationId,
      );

      return ResponseHandler.success(
        res,
        "Organization dashboard stats fetched successfully",
        stats,
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

      if (!user.organizationId) {
        throw new AppError(
          "Organization ID not found for this user",
          HttpStatusCode.BAD_REQUEST,
        );
      }

      const dto: GetPaymentHistoryDTO = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
        search: req.query.search as string | undefined,
        status: req.query.status as string | undefined,
        period: req.query.period as
          | "MONTHLY"
          | "YEARLY"
          | "CUSTOM"
          | undefined,
        year: req.query.year
          ? Number(req.query.year)
          : undefined,
        month: req.query.month
          ? Number(req.query.month)
          : undefined,
        startDate: req.query.startDate
          ? new Date(req.query.startDate as string)
          : undefined,
        endDate: req.query.endDate
          ? new Date(req.query.endDate as string)
          : undefined,
      };

      const result =
        await this.getOrgAdminPaymentHistoryUseCase.execute(
          user.organizationId,
          dto,
        );

      return ResponseHandler.success(
        res,
        "Payment history fetched successfully",
        result,
      );
    } catch (error) {
      next(error);
    }
  }

}