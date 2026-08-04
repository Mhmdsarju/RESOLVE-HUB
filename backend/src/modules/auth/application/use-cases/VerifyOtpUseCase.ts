import { VerifyOtpDto } from "../dto/VerifyOtpDto";

import { IOtpStore } from "../../domain/interfaces/IOtpStore";
import { IResetTokenStore } from "../../domain/interfaces/IResetTokenStore";
import { ITokenService } from "../../domain/interfaces/ITokenService";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../../config/types";
import { IVerifyOtpUseCase } from "../../domain/interfaces/use-cases/IVerifyOtpUseCase";
import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { ErrorMessages } from "../../../../shared/constant/ErrorMessages";
@injectable()
export class VerifyOtpUseCase implements IVerifyOtpUseCase {
  constructor(
    @inject(TYPES.OtpStore)
    private readonly otpStore: IOtpStore,
    @inject(TYPES.ResetTokenStore)
    private readonly resetTokenStore: IResetTokenStore,
    @inject(TYPES.TokenService)
    private readonly tokenService: ITokenService
  ) { }

  async execute(dto: VerifyOtpDto) {

    const storedOtp = await this.otpStore.getOtp(dto.email);

    if (!storedOtp) {
      throw new AppError(ErrorMessages.OTP_EXPIRED, HttpStatusCode.NOT_FOUND);
    }


    if (storedOtp !== dto.otp) {
      throw new AppError(ErrorMessages.INVALID_OTP, HttpStatusCode.BAD_REQUEST);
    }

    await this.otpStore.deleteOtp(dto.email);

    const resetToken = await this.tokenService.generateResetToken(dto.email);

    await this.resetTokenStore.saveResetToken(dto.email, resetToken);

    return {
      resetToken,
    };
  }
}