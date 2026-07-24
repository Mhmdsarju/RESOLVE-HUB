import { Request, Response, NextFunction } from "express";

import { RegisterUseCase } from "../../application/use-cases/RegisterUseCase";
import { LoginUseCase } from "../../application/use-cases/LoginUseCase";
import { RefreshUseCase } from "../../application/use-cases/RefreshUseCase";
import { LogoutUseCase } from "../../application/use-cases/LogoutUseCase";
import { ForgotPasswordUseCase } from "../../application/use-cases/ForgotPasswordUseCase";
import { VerifyOtpUseCase } from "../../application/use-cases/VerifyOtpUseCase";
import { VerifySignupOtpUseCase } from "../../application/use-cases/VerifySignupOtpUseCase";
import { ResetPasswordUseCase } from "../../application/use-cases/ResetPasswordUseCase";
import { ResendSignupOtpUseCase } from "../../application/use-cases/ResendSignupOtpUseCase";
import { ResendForgotPasswordOtpUseCase } from "../../application/use-cases/ResendForgotPasswordOtpUseCase";
import { GetCurrentUserUseCase } from "../../application/use-cases/GetCurrentUserUseCase";
import { ChangePasswordUseCase } from "../../application/use-cases/ChangePasswordUseCase";

export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshUseCase: RefreshUseCase,
    private readonly logoutUseCase: LogoutUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly verifyOtpUseCase: VerifyOtpUseCase,
    private readonly verifySignupOtpUseCase: VerifySignupOtpUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    private readonly resendSignupOtpUseCase: ResendSignupOtpUseCase,
    private readonly resendForgotPasswordOtpUseCase: ResendForgotPasswordOtpUseCase,
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
  ) { }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.registerUseCase.execute(req.body);

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifySignupOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.verifySignupOtpUseCase.execute(req.body);

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(201).json({
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
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
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

      const result = await this.refreshUseCase.execute(refreshToken);

      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
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

      await this.logoutUseCase.execute(refreshToken);

      res.clearCookie("refreshToken");

      return res.status(200).json({
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

      return res.status(200).json({
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

      return res.status(200).json({
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

      return res.status(200).json({
        success: true,
        message: "Password reset successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async resendSignupOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await this.resendSignupOtpUseCase.execute(req.body);

      return res.status(200).json({
        success: true,
        message: "OTP resent successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async resendForgotPasswordOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await this.resendForgotPasswordOtpUseCase.execute(req.body);

      return res.status(200).json({
        success: true,
        message: "OTP resent successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async me(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = req.user;

      if (!user) {
        throw new Error("Unauthorized");
      }

      const result = await this.getCurrentUserUseCase.execute(
        user.userId
      );

      return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = req.user;

      if (!user) {
        throw new Error("Unauthorized");
      }

      await this.changePasswordUseCase.execute(
        user.userId,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error) {
      next(error);
    }
  }


}

