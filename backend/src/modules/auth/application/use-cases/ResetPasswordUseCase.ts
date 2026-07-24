import { ResetPasswordDto } from "../dto/ResetPasswordDto";

import { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import { IPasswordHasher } from "../../domain/interfaces/IPasswordHasher";
import { ITokenService } from "../../domain/interfaces/ITokenService";
import { IResetTokenStore } from "../../domain/interfaces/IResetTokenStore";

export class ResetPasswordUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly tokenService: ITokenService,
    private readonly resetTokenStore: IResetTokenStore
  ) {}

  async execute(dto: ResetPasswordDto): Promise<void> {
    // 1. Verify Reset Token
    const payload = await this.tokenService.verifyResetToken(
      dto.resetToken
    );

    // 2. Get Stored Reset Token
    const storedResetToken =
      await this.resetTokenStore.getResetToken(payload.email);

    // 3. Validate Reset Token
    if (
      !storedResetToken ||
      storedResetToken !== dto.resetToken
    ) {
      throw new Error("Invalid reset token");
    }

    // 4. Hash New Password
    const hashedPassword =
      await this.passwordHasher.hash(dto.password);

    // 5. Update Password
    await this.authRepository.updateUserPassword(
      payload.email,
      hashedPassword
    );

    // 6. Delete Reset Token
    await this.resetTokenStore.deleteResetToken(
      payload.email
    );
  }
}