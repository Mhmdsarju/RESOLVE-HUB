import crypto from "crypto";

import { ForgotPasswordDto } from "../dto/ForgotPasswordDto";

import { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import { IOtpStore } from "../../domain/interfaces/IOtpStore";
import { IEmailService } from "../../domain/interfaces/IEmailService";

export class ForgotPasswordUseCase {
    constructor(
        private readonly authRepository: IAuthRepository,
        private readonly otpStore: IOtpStore,
        private readonly emailService: IEmailService
    ) { }

    async execute(dto: ForgotPasswordDto): Promise<void> {
        // 1. Check user exists
        const user = await this.authRepository.findUserByEmail(dto.email);

        if (!user) {
            throw new Error("User not found");
        }

        // 2. Generate 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();;

        // 3. Save OTP in Redis
        await this.otpStore.saveOtp(dto.email, otp);

        // 4. Send OTP Email
        await this.emailService.sendOtp(dto.email, otp);
    }
}