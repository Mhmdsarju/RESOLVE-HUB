import { NextFunction, Request, Response } from "express";

import { GetOrganizationProfileUseCase } from "../../application/use-cases/GetOrganizationProfileUseCase";

export class OrganizationController {
  constructor(
    private readonly getOrganizationProfileUseCase: GetOrganizationProfileUseCase
  ) {}

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
}