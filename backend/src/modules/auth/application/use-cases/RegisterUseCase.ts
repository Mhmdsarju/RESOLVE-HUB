import crypto from "crypto";

import { RegisterDto } from "../dto/RegisterDto";

import { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import { IPasswordHasher } from "../../domain/interfaces/IPasswordHasher";
import { ISignupStore } from "../../domain/interfaces/ISignupStore";
import { IOtpStore } from "../../domain/interfaces/IOtpStore";
import { IEmailService } from "../../domain/interfaces/IEmailService";

export class RegisterUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly signupStore: ISignupStore,
    private readonly otpStore: IOtpStore,
    private readonly emailService: IEmailService
  ) {}

  async execute(dto: RegisterDto) {
    // 1. Check if user already exists
    const existingUser = await this.authRepository.findUserByEmail(
      dto.email
    );

    if (existingUser) {
      throw new Error("User already exists");
    }

    // 2. Check if organization already exists
    const existingOrganization =
      await this.authRepository.findOrganizationByName(
        dto.organizationName
      );

    if (existingOrganization) {
      throw new Error("Organization already exists");
    }

    // 3. Hash password
    const hashedPassword = await this.passwordHasher.hash(dto.password);

    // 4. Save signup data in Redis
    await this.signupStore.save(dto.email, {
      organizationName: dto.organizationName,
      industry: dto.industry,
      companySize: dto.companySize,
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });

    // 5. Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // 6. Save OTP
    await this.otpStore.saveOtp(dto.email, otp);

    // 7. Send OTP
   await this.emailService.sendSignupOtp(dto.email, otp);

    // 8. Return response
    return {
      message: "OTP sent successfully",
    };
  }
}