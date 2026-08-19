import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";

import { IForgotPasswordUseCase } from "../../domain/interfaces/use-cases/IForgotPasswordUseCase";
import { IResetPasswordUseCase } from "../../domain/interfaces/use-cases/IResetPasswordUseCase";
import { IChangePasswordUseCase } from "../../domain/interfaces/use-cases/IChangePasswordUsecase";

import { TYPES } from "../../../../config/types";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { AppError } from "../../../../shared/errors/AppError";
import { ErrorMessages } from "../../../../shared/constant/ErrorMessages";
import { SuccessMessages } from "../../../../shared/constant/SuccessMessages";
import { ResponseHandler } from "../../../../shared/response/response-handler";

@injectable()
export class PasswordController {
    constructor(
        @inject(TYPES.ForgotPasswordUseCase)
        private readonly forgotPasswordUseCase: IForgotPasswordUseCase,

        @inject(TYPES.ResetPasswordUseCase)
        private readonly resetPasswordUseCase: IResetPasswordUseCase,

        @inject(TYPES.ChangePasswordUseCase)
        private readonly changePasswordUseCase: IChangePasswordUseCase,
    ) { }

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

    async changePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;

            if (!user) {
                throw new AppError(ErrorMessages.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED);
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