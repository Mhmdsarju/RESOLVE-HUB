import { Request, Response, NextFunction } from "express";
import { IRegisterUseCase } from "../../domain/interfaces/use-cases/IRegisterUseCase";
import { ILoginUseCase } from "../../domain/interfaces/use-cases/ILoginUseCase";
import { ILogoutUsecase } from "../../domain/interfaces/use-cases/ILogoutUseCase";
import { IRefreshUseCase } from "../../domain/interfaces/use-cases/IRefreshUseCase";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { AppError } from "../../../../shared/errors/AppError";
import { ErrorMessages } from "../../../../shared/constant/ErrorMessages";
import { SuccessMessages } from "../../../../shared/constant/SuccessMessages";
import { ResponseHandler } from "../../../../shared/response/response-handler";
import {
  setRefereshTokenCookie,
  clearRefreshTokenCookie,
} from "@/shared/utils/cookie.util";

export class AuthController {
  constructor(
    private readonly registerUseCase: IRegisterUseCase,
    private readonly loginUseCase: ILoginUseCase,
    private readonly refreshUseCase: IRefreshUseCase,
    private readonly logoutUseCase: ILogoutUsecase,
  ) { }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.registerUseCase.execute(req.body);

      return ResponseHandler.success(
        res,
        result.message,
        null,
        HttpStatusCode.OK
      );
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.loginUseCase.execute(req.body);

      setRefereshTokenCookie(res, result.refreshToken);

      return ResponseHandler.success(
        res,
        SuccessMessages.LOGIN_SUCCESSFUL,
        {
          user: result.user,
          accessToken: result.accessToken,
        },
        HttpStatusCode.OK
      );
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new AppError(
          ErrorMessages.REFRESH_TOKEN_NOT_FOUND,
          HttpStatusCode.NOT_FOUND
        );
      }

      const result = await this.refreshUseCase.execute({
        refreshToken,
      });

      setRefereshTokenCookie(res, result.refreshToken);

      return ResponseHandler.success(
        res,
        "Token refreshed successfully",
        {
          accessToken: result.accessToken,
        }
      );
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new AppError(
          ErrorMessages.REFRESH_TOKEN_NOT_FOUND,
          HttpStatusCode.NOT_FOUND
        );
      }

      await this.logoutUseCase.execute({
        refreshToken,
      });

      clearRefreshTokenCookie(res);

      return ResponseHandler.success(
        res,
        SuccessMessages.LOGOUT_SUCCESSFUL
      );
    } catch (error) {
      next(error);
    }
  }
}