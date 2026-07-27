import { NextFunction, Request, Response } from "express";
import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { injectable,inject } from "inversify";
import { TYPES } from "../../../../config/types";
import { IGetOrganizationProfileUseCase } from "../../domain/interfaces/IGetOrganizationProfileUseCase";
import { IUpdateOrganizationUseCase } from "../../domain/interfaces/IUpdateOrganizationUseCase";

injectable()
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
        throw new AppError("Unauthorized", HttpStatusCode.UNAUTHORIZED);
      }

      const organization =
        await this.getOrganizationProfileUseCase.execute(
          user.organizationId
        );

      return res.status(HttpStatusCode.OK).json({
        success: true,
        data: organization,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;

      if (!user) {
        throw new AppError("Unauthorized",HttpStatusCode.UNAUTHORIZED);
      }

      const result = await this.updateOrganizationUseCase.execute(
        user.organizationId,
        req.body
      );

      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Organization updated successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

}