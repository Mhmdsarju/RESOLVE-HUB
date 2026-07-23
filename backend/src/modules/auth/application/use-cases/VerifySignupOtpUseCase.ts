import { Organization } from "../../domain/entities/Organization";
import { User } from "../../domain/entities/User";

import { OrganizationStatus } from "../../domain/enums/OrganizationStatus";
import { UserRole } from "../../domain/enums/UserRole";

import { VerifySignupOtpDto } from "../dto/VerifySignupOtpDto";

import { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import { IOtpStore } from "../../domain/interfaces/IOtpStore";
import { ISignupStore } from "../../domain/interfaces/ISignupStore";
import { ITokenService } from "../../domain/interfaces/ITokenService";
import { ITokenStore } from "../../domain/interfaces/ITokenStore";

export class VerifySignupOtpUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly otpStore: IOtpStore,
    private readonly signupStore: ISignupStore,
    private readonly tokenService: ITokenService,
    private readonly tokenStore: ITokenStore
  ) {}

  async execute(dto: VerifySignupOtpDto) {
    // 1. Get OTP
    const storedOtp = await this.otpStore.getOtp(dto.email);

    if (!storedOtp) {
      throw new Error("OTP expired or not found");
    }

    // 2. Compare OTP
    if (storedOtp !== dto.otp) {
      throw new Error("Invalid OTP");
    }

    // 3. Get signup data
    const signupData = await this.signupStore.get(dto.email);

    if (!signupData) {
      throw new Error("Signup session expired");
    }

    // 4. Create organization
    const organization = new Organization({
      name: signupData.organizationName,
      industry: signupData.industry,
      companySize: signupData.companySize,
      status: OrganizationStatus.ACTIVE,
    });

    const savedOrganization =
      await this.authRepository.createOrganization(organization);

    // 5. Create user
    const user = new User({
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
      organizationId: savedOrganization.id!,
      role: UserRole.ORG_ADMIN,
    });

    const savedUser =
      await this.authRepository.createUser(user);

    // 6. Generate Tokens
    const payload = {
      userId: savedUser.id!,
      organizationId: savedUser.organizationId,
      role: savedUser.role,
    };

    const accessToken =
      await this.tokenService.generateAccessToken(payload);

    const refreshToken =
      await this.tokenService.generateRefreshToken(payload);

    await this.tokenStore.saveRefreshToken(
      savedUser.id!,
      refreshToken
    );

    // 7. Cleanup Redis
    await this.otpStore.deleteOtp(dto.email);
    await this.signupStore.delete(dto.email);

    // 8. Return response
    return {
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
        organizationId: savedUser.organizationId,
        role: savedUser.role,
      },
      accessToken,
      refreshToken,
    };
  }
}