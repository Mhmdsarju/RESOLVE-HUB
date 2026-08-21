import { Organization } from "../../../organization/domain/entities/Organization";
import { User } from "../../domain/entities/User";

// import { OrganizationStatus } from "../../domain/enums/OrganizationStatus";
import { UserRole } from "../../domain/enums/UserRole";
import { AppError } from "../../../../shared/errors/AppError";
import { VerifySignupOtpDto } from "../dto/VerifySignupOtpDto";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IOrganizationRepository } from "../../../organization/domain/repositories/IOrganizationRepository";
import { IOtpStore } from "../../domain/interfaces/IOtpStore";
import { ISignupStore } from "../../domain/interfaces/ISignupStore";
import { ITokenService } from "../../domain/interfaces/ITokenService";
import { ITokenStore } from "../../domain/interfaces/ITokenStore";
import { IVerifySignupOtpUseCase } from "../../domain/interfaces/use-cases/IVerifySignupOtpUseCase";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { ErrorMessages } from "../../../../shared/constant/ErrorMessages";
import { OrganizationStatus } from "@/modules/organization/domain/enums/organizationStatus.enum";
// import { OrganizationVerificationStatus } from "@/modules/organization/domain/enums/organizationVerificationStatus.enum";

export class VerifySignupOtpUseCase implements IVerifySignupOtpUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly organizationRepository: IOrganizationRepository,
    private readonly otpStore: IOtpStore,
    private readonly signupStore: ISignupStore,
    private readonly tokenService: ITokenService,
    private readonly tokenStore: ITokenStore
  ) { }

  async execute(dto: VerifySignupOtpDto) {
   
    const storedOtp = await this.otpStore.getOtp(dto.email);

    if (!storedOtp) {
      throw new AppError(ErrorMessages.OTP_EXPIRED,HttpStatusCode.BAD_REQUEST);
    }

  
    if (storedOtp !== dto.otp) {
      throw new AppError(ErrorMessages.INVALID_OTP,HttpStatusCode.BAD_REQUEST);
    }

    const signupData = await this.signupStore.get(dto.email);

    if (!signupData) {
      throw new AppError(ErrorMessages.SIGNUP_SESSION_EXPIRED,HttpStatusCode.BAD_REQUEST);
    }

    const organization = new Organization({
      name: signupData.organizationName,
      industry: signupData.industry,
      companySize: signupData.companySize,
      status: OrganizationStatus.PENDING_PROFILE,
    });

    const savedOrganization = await this.organizationRepository.create(organization);

    const user = new User({
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
      organizationId: savedOrganization.id!,
      role: UserRole.ORG_ADMIN,
    });

    const savedUser = await this.userRepository.create(user);

    const payload = {
      userId: savedUser.id!,
      organizationId: savedUser.organizationId!,
      role: savedUser.role,
    };

    const accessToken = await this.tokenService.generateAccessToken(payload);

    const refreshToken = await this.tokenService.generateRefreshToken(payload);

    await this.tokenStore.saveRefreshToken(savedUser.id!, refreshToken);

    await this.otpStore.deleteOtp(dto.email);
    await this.signupStore.delete(dto.email);

    return {
      user: {
        id: savedUser.id!,
        name: savedUser.name,
        email: savedUser.email,
        organizationId: savedUser.organizationId!,
        role: savedUser.role,
      },
      accessToken,
      refreshToken,
    };
  }
}