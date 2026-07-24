import crypto from "crypto";

import { ResendForgotPasswordOtpDto } from "../dto/ResendForgotPasswordOtpDto";

import { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import { IOtpStore } from "../../domain/interfaces/IOtpStore";
import { IEmailService } from "../../domain/interfaces/IEmailService";

export class ResendForgotPasswordOtpUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly otpStore: IOtpStore,
    private readonly emailService: IEmailService
  ) {}

  async execute(dto: ResendForgotPasswordOtpDto): Promise<void> {
    // 1. Check user exists
    const user = await this.authRepository.findUserByEmail(dto.email);

    if (!user) {
      throw new Error("User not found");
    }

    // 2. Delete old OTP
    await this.otpStore.deleteOtp(dto.email);

    // 3. Generate new OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // 4. Save OTP
    await this.otpStore.saveOtp(dto.email, otp);

    // 5. Send Email
    await this.emailService.sendForgotPasswordOtp(dto.email, otp);
  }
}