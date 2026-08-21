import { Request, Response, NextFunction } from "express";
import { BaseController } from "@/shared/base/controllers/BaseController";
import { ResponseHandler } from "@/shared/response/response-handler";
import { IGetUsersByOrganizationUseCase } from "../../domain/interfaces/use-cases/IGetUsersByOrganizationUseCase";
import { IGetMeUseCase } from "../../domain/interfaces/use-cases/IGetMeUseCase";
import { IUpdateMeUseCase } from "../../domain/interfaces/use-cases/IUpdateMeUseCase";

export class UserController extends BaseController {
  constructor(
    private readonly getUsersByOrganizationUseCase: IGetUsersByOrganizationUseCase,
    private readonly getMeUseCase: IGetMeUseCase,
    private readonly updateMeUseCase: IUpdateMeUseCase,
  ) {
    super();
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const user = this.getCurrentUser(req);

      const users = await this.getUsersByOrganizationUseCase.execute(user.organizationId);

      return ResponseHandler.success(
        res,
        "Users fetched successfully",
        users
      );
    } catch (error) {
      next(error);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const user = this.getCurrentUser(req);

      const result = await this.getMeUseCase.execute(
        user.userId
      );

      return ResponseHandler.success(
        res,
        "User profile fetched successfully",
        result
      );
    } catch (error) {
      next(error);
    }
  }

  async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const user = this.getCurrentUser(req);

      const updatedUser = await this.updateMeUseCase.execute({
        userId: user.userId,
        name: req.body.name,
      });

      return ResponseHandler.success(
        res,
        "User profile updated successfully",
        updatedUser
      );
    } catch (error) {
      next(error);
    }
  }
}