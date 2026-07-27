import { ForgotPasswordDto } from "../dto/ForgotPasswordDto";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IOtpStore } from "../../domain/interfaces/IOtpStore";
import { IEmailService } from "../../domain/interfaces/IEmailService";

import { injectable, inject } from "inversify";
import { TYPES } from "../../../../config/types";
import { IForgotPasswordUseCase } from "../../domain/interfaces/use-cases/IForgotPasswordUseCase";
import { generateotp } from "../../../../shared/utils/generateOtp";
import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
@injectable()
export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
    constructor(
        @inject(TYPES.UserRepository)
        private readonly userRepository: IUserRepository,
        @inject(TYPES.OtpStore)
        private readonly otpStore: IOtpStore,
        @inject(TYPES.EmailService)
        private readonly emailService: IEmailService
    ) { }

    async execute(dto: ForgotPasswordDto): Promise<void> {

       const user = await this.userRepository.findByEmail(dto.email);

        if (!user) {
            throw new AppError("User not found",HttpStatusCode.NOT_FOUND);
        }

        const otp = generateotp();

        await this.otpStore.saveOtp(dto.email, otp);

        await this.emailService.sendForgotPasswordOtp(dto.email, otp);
    }
}