import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";
import { BaseController } from "@/shared/base/controllers/BaseController";
import { ResponseHandler } from "@/shared/response/response-handler";

import { IGetUsersByOrganizationUseCase } from "../../domain/interfaces/use-cases/IGetUsersByOrganizationUseCase";

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(TYPES.GetUsersByOrganizationUseCase)
    private readonly getUsersByOrganizationUseCase: IGetUsersByOrganizationUseCase,
  ) {
    super();
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const user = this.getCurrentUser(req);

      const users =
        await this.getUsersByOrganizationUseCase.execute(
          user.organizationId,
        );

      return ResponseHandler.success(
        res,
        "Users fetched successfully",
        users,
      );
    } catch (error) {
      next(error);
    }
  }
}