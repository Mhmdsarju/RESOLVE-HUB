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
import { config } from "../../../../config/env";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";

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

      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifySignupOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.verifySignupOtpUseCase.execute(req.body);

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: config.refreshCookieMaxAge,
      });

      return res.status(HttpStatusCode.CREATED).json({
        success: true,
        message: "User registered successfully",
        data: {
          user: result.user,
          accessToken: result.accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.loginUseCase.execute(req.body);

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: config.refreshCookieMaxAge,
      });

      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Login successful",
        data: {
          user: result.user,
          accessToken: result.accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new Error("Refresh token not found");
      }

      const result = await this.refreshUseCase.execute({ refreshToken });

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: config.refreshCookieMaxAge,
      });

      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Token refreshed successfully",
        data: {
          accessToken: result.accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new Error("Refresh token not found");
      }

      await this.logoutUseCase.execute({ refreshToken });

      res.clearCookie("refreshToken");

      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await this.forgotPasswordUseCase.execute(req.body);

      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: "OTP sent successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.verifyOtpUseCase.execute(req.body);

      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: "OTP verified successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await this.resetPasswordUseCase.execute(req.body);

      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Password reset successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async resendSignupOtp(req: Request, res: Response, next: NextFunction
  ) {
    try {
      await this.resendSignupOtpUseCase.execute(req.body);

      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: "OTP resent successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async resendForgotPasswordOtp(req: Request, res: Response, next: NextFunction) {
    try {
      await this.resendForgotPasswordOtpUseCase.execute(req.body);

      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: "OTP resent successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;

      if (!user) {
        throw new Error("Unauthorized");
      }

      const result = await this.getCurrentUserUseCase.execute({
        userId: user.userId,
      });

      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: "User fetched successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;

      if (!user) {
        throw new Error("Unauthorized");
      }

      await this.changePasswordUseCase.execute(
        user.userId,
        req.body
      );

      return res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error) {
      next(error);
    }
  }


}

