import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";

import { IVerifyOtpUseCase } from "../../domain/interfaces/use-cases/IVerifyOtpUseCase";
import { IVerifySignupOtpUseCase } from "../../domain/interfaces/use-cases/IVerifySignupOtpUseCase";
import { IResendForgotPasswordOtpUseCase } from "../../domain/interfaces/use-cases/IResendForgotPasswordOtpUseCase";
import { IResendSignupOtpUseCase } from "../../domain/interfaces/use-cases/IResendSignupOtpUseCase";

import { TYPES } from "../../../../config/types";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { SuccessMessages } from "../../../../shared/constant/SuccessMessages";
import { ResponseHandler } from "../../../../shared/response/response-handler";
import { setRefereshTokenCookie } from "@/shared/utils/cookie.util";

@injectable()
export class OtpController {
  constructor(
    @inject(TYPES.VerifyOtpUseCase)
    private readonly verifyOtpUseCase: IVerifyOtpUseCase,

    @inject(TYPES.VerifySignUpOtpUseCase)
    private readonly verifySignupOtpUseCase: IVerifySignupOtpUseCase,

    @inject(TYPES.ResendSignUpOtpUseCase)
    private readonly resendSignupOtpUseCase: IResendSignupOtpUseCase,

    @inject(TYPES.ResendForgotPasswordOtpUseCase)
    private readonly resendForgotPasswordOtpUseCase: IResendForgotPasswordOtpUseCase,
  ) {}

  async verifySignupOtp(    req: Request,    res: Response,    next: NextFunction  ) {
    try {
      const result = await this.verifySignupOtpUseCase.execute(req.body);

      setRefereshTokenCookie(res, result.refreshToken);

      return ResponseHandler.success(
        res,
        SuccessMessages.USER_REGISTERED,
        {
          user: result.user,
          accessToken: result.accessToken,
        },
        HttpStatusCode.CREATED
      );
    } catch (error) {
      next(error);
    }
  }

  async verifyOtp(    req: Request,    res: Response,    next: NextFunction  ) {
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

  async resendSignupOtp(    req: Request,    res: Response,    next: NextFunction  ) {
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

  async resendForgotPasswordOtp(    req: Request,    res: Response,    next: NextFunction  ) {
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
}