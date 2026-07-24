import { ChangePasswordDto } from "../dto/ChangePasswordDto";

import { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import { IPasswordHasher } from "../../domain/interfaces/IPasswordHasher";

export class ChangePasswordUseCase {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly passwordHasher: IPasswordHasher
  ) {}

  async execute(userId: string, dto: ChangePasswordDto): Promise<void> {
    // 1. Get user
    const user = await this.authRepository.findUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // 2. Verify current password
    const isPasswordValid = await this.passwordHasher.compare(
      dto.currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    // 3. Prevent same password
    const isSamePassword = await this.passwordHasher.compare(
      dto.newPassword,
      user.password
    );

    if (isSamePassword) {
      throw new Error(
        "New password must be different from current password"
      );
    }

    // 4. Hash new password
    const hashedPassword = await this.passwordHasher.hash(
      dto.newPassword
    );

    // 5. Update password
    await this.authRepository.updateUserPassword(
      user.email,
      hashedPassword
    );
  }
}