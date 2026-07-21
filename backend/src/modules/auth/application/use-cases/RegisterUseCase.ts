import { RegisterDto } from "../dto/RegisterDto";
import { Organization } from "../../domain/entities/Organization";
import { User } from "../../domain/entities/User";
import { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import { IPasswordHasher } from "../../domain/interfaces/IPasswordHasher";
import { OrganizationStatus } from "../../domain/enums/OrganizationStatus";
import { ITokenService } from "../../domain/interfaces/ITokenService";
import { ITokenStore } from "../../domain/interfaces/ITokenStore";
import { UserRole } from "../../domain/enums/UserRole";

export class RegisterUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly tokenService: ITokenService,
    private readonly tokenStore: ITokenStore
  ) { }

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

    // 4. Create organization entity
    const organization = new Organization({
      name: dto.organizationName,
      industry: null,
      companySize: null,
      status: OrganizationStatus.ACTIVE,
    });

    // 5. Save organization
    const savedOrganization = await this.authRepository.createOrganization(organization);

    // 6. Create user entity
    const user = new User({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      organizationId: savedOrganization.id!,
      role: UserRole.ORG_ADMIN
    });

    // 7. Save user
    const savedUser = await this.authRepository.createUser(user);

    const payload = {
      userId: savedUser.id!,
      organizationId: savedUser.organizationId,
      role: savedUser.role,
    };

    const accessToken = await this.tokenService.generateAccessToken(payload);

    const refreshToken = await this.tokenService.generateRefreshToken(payload);

    await this.tokenStore.saveRefreshToken( savedUser.id!, refreshToken );

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