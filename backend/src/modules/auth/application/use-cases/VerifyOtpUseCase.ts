import { VerifyOtpDto } from "../dto/VerifyOtpDto";

import { IOtpStore } from "../../domain/interfaces/IOtpStore";
import { IResetTokenStore } from "../../domain/interfaces/IResetTokenStore";
import { ITokenService } from "../../domain/interfaces/ITokenService";

export class VerifyOtpUseCase {
  constructor(
    private readonly otpStore: IOtpStore,
    private readonly resetTokenStore: IResetTokenStore,
    private readonly tokenService: ITokenService
  ) { }

  async execute(dto: VerifyOtpDto) {
    // 1. Get OTP
    const storedOtp = await this.otpStore.getOtp(dto.email);

    if (!storedOtp) {
      throw new Error("OTP expired or not found");
    }

    // 2. Compare OTP
    if (storedOtp !== dto.otp) {
      throw new Error("Invalid OTP");
    }

    // 3. Delete OTP
    await this.otpStore.deleteOtp(dto.email);

    // 4. Generate Reset Token
    const resetToken =
      await this.tokenService.generateResetToken(dto.email);

    // 5. Save Reset Token
    await this.resetTokenStore.saveResetToken(
      dto.email,
      resetToken
    );

    // 6. Return Reset Token
    return {
      resetToken,
    };
  }
}