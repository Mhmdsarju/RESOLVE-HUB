import { ResetPasswordDto } from "../dto/ResetPasswordDto";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IPasswordHasher } from "../../domain/interfaces/IPasswordHasher";
import { ITokenService } from "../../domain/interfaces/ITokenService";
import { IResetTokenStore } from "../../domain/interfaces/IResetTokenStore";
import { IResetPasswordUseCase } from "../../domain/interfaces/use-cases/IResetPasswordUseCase";
import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { ErrorMessages } from "../../../../shared/constant/ErrorMessages";

export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: IPasswordHasher,
    private readonly tokenService: ITokenService,
    private readonly resetTokenStore: IResetTokenStore
  ) { }

  async execute(dto: ResetPasswordDto): Promise<void> {

    const payload = await this.tokenService.verifyResetToken(dto.resetToken);

    const storedResetToken = await this.resetTokenStore.getResetToken(payload.email);

    if (!storedResetToken || storedResetToken !== dto.resetToken) {
      throw new AppError(ErrorMessages.INVALID_RESET_TOKEN, HttpStatusCode.UNAUTHORIZED);
    }

    const hashedPassword = await this.passwordHasher.hash(dto.password);

    await this.userRepository.updatePassword(
      payload.email,
      hashedPassword
    );

    await this.resetTokenStore.deleteResetToken(payload.email);
  }
}