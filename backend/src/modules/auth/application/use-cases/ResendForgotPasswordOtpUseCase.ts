import { ResendForgotPasswordOtpDto } from "../dto/ResendForgotPasswordOtpDto";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IOtpStore } from "../../domain/interfaces/IOtpStore";
import { IEmailService } from "../../domain/interfaces/IEmailService";
import { IResendForgotPasswordOtpUseCase } from "../../domain/interfaces/use-cases/IResendForgotPasswordOtpUseCase";
import { AppError } from "../../../../shared/errors/AppError";
import { generateotp } from "../../../../shared/utils/generateOtp";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { ErrorMessages } from "../../../../shared/constant/ErrorMessages";

export class ResendForgotPasswordOtpUseCase implements IResendForgotPasswordOtpUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly otpStore: IOtpStore,
    private readonly emailService: IEmailService
  ) { }

  async execute(dto: ResendForgotPasswordOtpDto): Promise<void> {

    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new AppError(ErrorMessages.USER_NOT_FOUND, HttpStatusCode.NOT_FOUND);
    }

    await this.otpStore.deleteOtp(dto.email);

    const otp = generateotp();

    await this.otpStore.saveOtp(dto.email, otp);

    await this.emailService.sendForgotPasswordOtp(dto.email, otp);
  }
}