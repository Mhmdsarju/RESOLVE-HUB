import { RegisterDto } from "../dto/RegisterDto";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IOrganizationRepository } from "../../../organization/domain/repositories/IOrganizationRepository";
import { IPasswordHasher } from "../../domain/interfaces/IPasswordHasher";
import { ISignupStore } from "../../domain/interfaces/ISignupStore";
import { IOtpStore } from "../../domain/interfaces/IOtpStore";
import { IEmailService } from "../../domain/interfaces/IEmailService";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../../config/types";
import { IRegisterUseCase } from "../../domain/interfaces/use-cases/IRegisterUseCase";
import { AppError } from "../../../../shared/errors/AppError";
import { generateotp } from "../../../../shared/utils/generateOtp";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";

@injectable()
export class RegisterUseCase implements IRegisterUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,

    @inject(TYPES.OrganizationRepository)
    private readonly organizationRepository: IOrganizationRepository,

    @inject(TYPES.PasswordHasher)
    private readonly passwordHasher: IPasswordHasher,

    @inject(TYPES.SignupStore)
    private readonly signupStore: ISignupStore,

    @inject(TYPES.OtpStore)
    private readonly otpStore: IOtpStore,

    @inject(TYPES.EmailService)
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
      message: "OTP sent successfully",
    };
  }
}