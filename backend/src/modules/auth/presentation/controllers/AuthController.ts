import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { IRegisterUseCase } from "../../domain/interfaces/use-cases/IRegisterUseCase";
import { IChangePasswordUseCase } from "../../domain/interfaces/use-cases/IChangePasswordUsecase";
import { ILoginUseCase } from "../../domain/interfaces/use-cases/ILoginUseCase";
import { ILogoutUsecase } from "../../domain/interfaces/use-cases/ILogoutUseCase";
import { IRefreshUseCase } from "../../domain/interfaces/use-cases/IRefreshUseCase";
import { IForgotPasswordUseCase } from "../../domain/interfaces/use-cases/IForgotPasswordUseCase";
import { IVerifyOtpUseCase } from "../../domain/interfaces/use-cases/IVerifyOtpUseCase";
import { IVerifySignupOtpUseCase } from "../../domain/interfaces/use-cases/IVerifySignupOtpUseCase";
import { IResetPasswordUseCase } from "../../domain/interfaces/use-cases/IResetPasswordUseCase";
import { IResendForgotPasswordOtpUseCase } from "../../domain/interfaces/use-cases/IResendForgotPasswordOtpUseCase";
import { IResendSignupOtpUseCase } from "../../domain/interfaces/use-cases/IResendSignupOtpUseCase";
import { IGetCurrentUseCase } from "../../domain/interfaces/use-cases/IGetCurrentUseCase";
import { TYPES } from "../../../../config/types";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { AppError } from "../../../../shared/errors/AppError";
import { SuccessMessages } from "../../../../shared/constant/SuccessMessages";
import { ErrorMessages } from "../../../../shared/constant/ErrorMessages";
import { ResponseHandler } from "../../../../shared/response/response-handler";
import { setRefereshTokenCookie,clearRefreshTokenCookie } from "@/shared/utils/cookie.util";

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.RegisterUseCase)
    private readonly registerUseCase: IRegisterUseCase,
    @inject(TYPES.LoginUseCase)
    private readonly loginUseCase: ILoginUseCase,
    @inject(TYPES.RefreshUseCase)
    private readonly refreshUseCase: IRefreshUseCase,
    @inject(TYPES.LogoutUseCase)
    private readonly logoutUseCase: ILogoutUsecase,
    @inject(TYPES.ForgotPasswordUseCase)
    private readonly forgotPasswordUseCase: IForgotPasswordUseCase,
    @inject(TYPES.VerifyOtpUseCase)
    private readonly verifyOtpUseCase: IVerifyOtpUseCase,
    @inject(TYPES.VerifySignUpOtpUseCase)
    private readonly verifySignupOtpUseCase: IVerifySignupOtpUseCase,
    @inject(TYPES.ResetPasswordUseCase)
    private readonly resetPasswordUseCase: IResetPasswordUseCase,
    @inject(TYPES.ResendSignUpOtpUseCase)
    private readonly resendSignupOtpUseCase: IResendSignupOtpUseCase,
    @inject(TYPES.ResendForgotPasswordOtpUseCase)
    private readonly resendForgotPasswordOtpUseCase: IResendForgotPasswordOtpUseCase,
    @inject(TYPES.GetCurrentUseUseCase)
    private readonly getCurrentUserUseCase: IGetCurrentUseCase,
    @inject(TYPES.ChangePasswordUseCase)
    private readonly changePasswordUseCase: IChangePasswordUseCase,
  ) { }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.registerUseCase.execute(req.body);

      return ResponseHandler.success(res, result.message, null, HttpStatusCode.OK)

    } catch (error) {
      next(error);
    }
  }

  async verifySignupOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.verifySignupOtpUseCase.execute(req.body);

      setRefereshTokenCookie(res,result.refreshToken);

      return ResponseHandler.success(
        res,
        SuccessMessages.USER_REGISTERED,
        {
          user: result.user,
          accessToken: result.accessToken
        },
        HttpStatusCode.CREATED
      )

    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.loginUseCase.execute(req.body);

      setRefereshTokenCookie(res,result.refreshToken);

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
        throw new AppError(ErrorMessages.REFRESH_TOKEN_NOT_FOUND, HttpStatusCode.NOT_FOUND);
      }

      const result = await this.refreshUseCase.execute({ refreshToken });

      setRefereshTokenCookie(res,result.refreshToken);

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
        throw new AppError("Refresh token not found", HttpStatusCode.NOT_FOUND);
      }

      await this.logoutUseCase.execute({ refreshToken });

      clearRefreshTokenCookie(res);

      return ResponseHandler.success(
        res,
        SuccessMessages.LOGOUT_SUCCESSFUL
      );
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await this.forgotPasswordUseCase.execute(req.body);

      return ResponseHandler.success(
        res,
        SuccessMessages.OTP_SENT
      );

    } catch (error) {
      next(error);
    }
  }

  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.verifyOtpUseCase.execute(req.body);

      return ResponseHandler.success(
        res,
        SuccessMessages.OTP_VERIFIED,
        result
      );

    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await this.resetPasswordUseCase.execute(req.body);

      return ResponseHandler.success(
        res,
        "Password reset successfully"
      );

    } catch (error) {
      next(error);
    }
  }

  async resendSignupOtp(req: Request, res: Response, next: NextFunction
  ) {
    try {
      await this.resendSignupOtpUseCase.execute(req.body);

      return ResponseHandler.success(
        res,
        SuccessMessages.OTP_RESENT
      );

    } catch (error) {
      next(error);
    }
  }

  async resendForgotPasswordOtp(req: Request, res: Response, next: NextFunction) {
    try {
      await this.resendForgotPasswordOtpUseCase.execute(req.body);

      return ResponseHandler.success(
        res,
        SuccessMessages.OTP_RESENT
      );

    } catch (error) {
      next(error);
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;

      if (!user) {
        throw new AppError(ErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED);
      }

      const result = await this.getCurrentUserUseCase.execute({
        userId: user.userId,
      });

      return ResponseHandler.success(
        res,
        "User fetched successfully",
        result
      );

    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;

      if (!user) {
        throw new AppError("Unauthorized", HttpStatusCode.UNAUTHORIZED);
      }

      await this.changePasswordUseCase.execute(
        user.userId,
        req.body
      );

      return ResponseHandler.success(
        res,
        "Password changed successfully"
      );
    } catch (error) {
      next(error);
    }
  }


}

