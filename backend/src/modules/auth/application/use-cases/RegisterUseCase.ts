import { RegisterDto } from "../dto/RegisterDto";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IOrganizationRepository } from "../../../organization/domain/repositories/IOrganizationRepository";
import { IPasswordHasher } from "../../domain/interfaces/IPasswordHasher";
import { ISignupStore } from "../../domain/interfaces/ISignupStore";
import { IOtpStore } from "../../domain/interfaces/IOtpStore";
import { IEmailService } from "../../domain/interfaces/IEmailService";
import { IRegisterUseCase } from "../../domain/interfaces/use-cases/IRegisterUseCase";
import { AppError } from "../../../../shared/errors/AppError";
import { generateotp } from "../../../../shared/utils/generateOtp";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { SuccessMessages } from "../../../../shared/constant/SuccessMessages";

export class RegisterUseCase implements IRegisterUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly organizationRepository: IOrganizationRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly signupStore: ISignupStore,
    private readonly otpStore: IOtpStore,
    private readonly emailService: IEmailService
  ) { }

  async execute(dto: RegisterDto) {

    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) { throw new AppError("User already exists", HttpStatusCode.CONFLICT); }


    const existingOrganization = await this.organizationRepository.findByName(dto.organizationName);

    if (existingOrganization) {
      throw new AppError("Organization already exists",HttpStatusCode.CONFLICT);
    }

    const hashedPassword = await this.passwordHasher.hash(dto.password);
    await this.signupStore.save(dto.email, {
      organizationName: dto.organizationName,
      industry: dto.industry,
      companySize: dto.companySize,
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });

    const otp = generateotp()

    await this.otpStore.saveOtp(dto.email, otp);

    await this.emailService.sendSignupOtp(dto.email, otp);

    return {
      message: SuccessMessages.OTP_SENT,
    };
  }
}