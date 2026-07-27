import { ResendForgotPasswordOtpDto } from "../dto/ResendForgotPasswordOtpDto";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IOtpStore } from "../../domain/interfaces/IOtpStore";
import { IEmailService } from "../../domain/interfaces/IEmailService";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../../config/types";
import { IResendForgotPasswordOtpUseCase } from "../../domain/interfaces/use-cases/IResendForgotPasswordOtpUseCase";
import { AppError } from "../../../../shared/errors/AppError";
import { generateotp } from "../../../../shared/utils/generateOtp";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";

@injectable()
export class ResendForgotPasswordOtpUseCase implements IResendForgotPasswordOtpUseCase {
  constructor(
    @inject(TYPES.UserRepository)
private readonly userRepository: IUserRepository,
    @inject(TYPES.OtpStore)
    private readonly otpStore: IOtpStore,
    @inject(TYPES.EmailService)
    private readonly emailService: IEmailService
  ) {}

  async execute(dto: ResendForgotPasswordOtpDto): Promise<void> {

    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new AppError("User not found",HttpStatusCode.NOT_FOUND);
    }

    await this.otpStore.deleteOtp(dto.email);

    const otp = generateotp();

    await this.otpStore.saveOtp(dto.email, otp);

    await this.emailService.sendForgotPasswordOtp(dto.email, otp);
  }
}