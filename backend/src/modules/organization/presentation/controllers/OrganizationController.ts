import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../../config/types";
import { IGetOrganizationProfileUseCase } from "../../domain/interfaces/IGetOrganizationProfileUseCase";
import { IUpdateOrganizationUseCase } from "../../domain/interfaces/IUpdateOrganizationUseCase";
import { ErrorMessages } from "../../../../shared/constant/ErrorMessages";
import { ResponseHandler } from "../../../../shared/response/response-handler";


@injectable()
export class OrganizationController {
  constructor(
    @inject(TYPES.GetOrganizationProfileUseCase)
    private readonly getOrganizationProfileUseCase: IGetOrganizationProfileUseCase,
    @inject(TYPES.UpdateOrganizationUseCase)
    private readonly updateOrganizationUseCase: IUpdateOrganizationUseCase
  ) { }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;

      if (!user) {
        throw new AppError(ErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED);
      }

      const organization = await this.getOrganizationProfileUseCase.execute(user.organizationId);

      return ResponseHandler.success(
        res,
        "Organization fetched successfully",
        organization
      )

    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;

      if (!user) {
        throw new AppError(ErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED);
      }

      const result = await this.updateOrganizationUseCase.execute(
        user.organizationId,
        req.body
      );

      return ResponseHandler.success(
        res,
        "Organization Updated Successfully",
        result
      )
    } catch (error) {
      next(error);
    }
  }

}