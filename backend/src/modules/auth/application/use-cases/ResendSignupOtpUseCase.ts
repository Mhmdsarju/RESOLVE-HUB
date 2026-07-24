import crypto from "crypto";

import { ResendSignupOtpDto } from "../dto/ResendSignupOtpDto";

import { ISignupStore } from "../../domain/interfaces/ISignupStore";
import { IOtpStore } from "../../domain/interfaces/IOtpStore";
import { IEmailService } from "../../domain/interfaces/IEmailService";

export class ResendSignupOtpUseCase {
  constructor(
    private readonly signupStore: ISignupStore,
    private readonly otpStore: IOtpStore,
    private readonly emailService: IEmailService
  ) {}

  async execute(dto: ResendSignupOtpDto): Promise<void> {
    // 1. Check signup session
    const signupData = await this.signupStore.get(dto.email);

    if (!signupData) {
      throw new Error("Signup session expired. Please register again.");
    }

    // 2. Delete old OTP
    await this.otpStore.deleteOtp(dto.email);

    // 3. Generate new OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // 4. Save new OTP
    await this.otpStore.saveOtp(dto.email, otp);

    // 5. Send email
    await this.emailService.sendSignupOtp(dto.email, otp);
  }
}