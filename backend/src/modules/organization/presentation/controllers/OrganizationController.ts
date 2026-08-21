import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { ErrorMessages } from "../../../../shared/constant/ErrorMessages";
import { ResponseHandler } from "../../../../shared/response/response-handler";

import { IGetOrganizationProfileUseCase } from "../../domain/interfaces/IGetOrganizationProfileUseCase";
import { IUpdateOrganizationUseCase } from "../../domain/interfaces/IUpdateOrganizationUseCase";
import { ISubmitOrganizationVerificationUseCase } from "../../domain/interfaces/ISubmitOrganizationVerificationUseCase";
import { IGetOrganizationVerificationUseCase } from "../../domain/interfaces/IGetOrganizationVerificationUseCase";

export class OrganizationController {
  constructor(
    private readonly getOrganizationProfileUseCase: IGetOrganizationProfileUseCase,
    private readonly updateOrganizationUseCase: IUpdateOrganizationUseCase,
    private readonly submitOrganizationVerificationUseCase: ISubmitOrganizationVerificationUseCase,
    private readonly getOrganizationVerificationUseCase: IGetOrganizationVerificationUseCase,
  ) { }

  async getProfile(req: Request, res: Response, next: NextFunction,) {
    try {
      const user = req.user;

      if (!user) {
        throw new AppError(ErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED,);
      }

      if (!user.organizationId) {
        throw new AppError("Organization ID not found for this user", HttpStatusCode.BAD_REQUEST,);
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

      const result = await this.updateOrganizationUseCase.execute(user.organizationId, req.body,);

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
}