import { NextFunction, Request, Response } from "express";
import { GetOrganizationProfileUseCase } from "../../application/use-cases/GetOrganizationProfileUseCase";
import { UpdateOrganizationUseCase } from "../../application/use-cases/UpdateOrganizationUseCase";

export class OrganizationController {
  constructor(
    private readonly getOrganizationProfileUseCase: GetOrganizationProfileUseCase,
    private readonly updateOrganizationUseCase: UpdateOrganizationUseCase
  ) { }

  async getProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = req.user;

      if (!user) {
        throw new Error("Unauthorized");
      }

      const organization =
        await this.getOrganizationProfileUseCase.execute(
          user.organizationId
        );

      return res.status(200).json({
        success: true,
        data: organization,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = req.user;

      if (!user) {
        throw new Error("Unauthorized");
      }

      const result = await this.updateOrganizationUseCase.execute(
        user.organizationId,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Organization updated successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

}