import { ResetPasswordDto } from "../dto/ResetPasswordDto";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IPasswordHasher } from "../../domain/interfaces/IPasswordHasher";
import { ITokenService } from "../../domain/interfaces/ITokenService";
import { IResetTokenStore } from "../../domain/interfaces/IResetTokenStore";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../../config/types";
import { IResetPasswordUseCase } from "../../domain/interfaces/use-cases/IResetPasswordUseCase";
import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
@injectable()
export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,
    @inject(TYPES.PasswordHasher)
    private readonly passwordHasher: IPasswordHasher,
    @inject(TYPES.TokenService)
    private readonly tokenService: ITokenService,
    @inject(TYPES.ResetTokenStore)
    private readonly resetTokenStore: IResetTokenStore
  ) { }

  async execute(dto: ResetPasswordDto): Promise<void> {

    const payload = await this.tokenService.verifyResetToken(dto.resetToken);

    const storedResetToken = await this.resetTokenStore.getResetToken(payload.email);

    if (!storedResetToken || storedResetToken !== dto.resetToken) {
      throw new AppError("Invalid reset token", HttpStatusCode.UNAUTHORIZED);
    }

    const hashedPassword = await this.passwordHasher.hash(dto.password);

    await this.userRepository.updatePassword(
      payload.email,
      hashedPassword
    );

    await this.resetTokenStore.deleteResetToken(payload.email);
  }
}