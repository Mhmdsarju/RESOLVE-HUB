import { ForgotPasswordDto } from "../dto/ForgotPasswordDto";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IOtpStore } from "../../domain/interfaces/IOtpStore";
import { IEmailService } from "../../domain/interfaces/IEmailService";
import { IForgotPasswordUseCase } from "../../domain/interfaces/use-cases/IForgotPasswordUseCase";
import { generateotp } from "../../../../shared/utils/generateOtp";
import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { ErrorMessages } from "../../../../shared/constant/ErrorMessages";
export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly otpStore: IOtpStore,
        private readonly emailService: IEmailService
    ) { }

    async execute(dto: ForgotPasswordDto): Promise<void> {

       const user = await this.userRepository.findByEmail(dto.email);

        if (!user) {
            throw new AppError(ErrorMessages.USER_NOT_FOUND,HttpStatusCode.NOT_FOUND);
        }

        const otp = generateotp();

        await this.otpStore.saveOtp(dto.email, otp);

        await this.emailService.sendForgotPasswordOtp(dto.email, otp);
    }
}