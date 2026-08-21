import { ResendSignupOtpDto } from "../dto/ResendSignupOtpDto";
import { ISignupStore } from "../../domain/interfaces/ISignupStore";
import { IOtpStore } from "../../domain/interfaces/IOtpStore";
import { IEmailService } from "../../domain/interfaces/IEmailService";
import { IResendSignupOtpUseCase } from "../../domain/interfaces/use-cases/IResendSignupOtpUseCase";
import { AppError } from "../../../../shared/errors/AppError";
import { generateotp } from "../../../../shared/utils/generateOtp";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { ErrorMessages } from "../../../../shared/constant/ErrorMessages";

export class ResendSignupOtpUseCase implements IResendSignupOtpUseCase {
  constructor(
    private readonly signupStore: ISignupStore,
    private readonly otpStore: IOtpStore,
    private readonly emailService: IEmailService
  ) {}

  async execute(dto: ResendSignupOtpDto): Promise<void> {
   
    const signupData = await this.signupStore.get(dto.email);

    if (!signupData) {
      throw new AppError(ErrorMessages.SIGNUP_SESSION_EXPIRED,HttpStatusCode.BAD_REQUEST);
    }

    await this.otpStore.deleteOtp(dto.email);

    const otp = generateotp();

    await this.otpStore.saveOtp(dto.email, otp);

    await this.emailService.sendSignupOtp(dto.email, otp);
  }
}