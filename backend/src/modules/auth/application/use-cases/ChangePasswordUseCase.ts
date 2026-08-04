import { ChangePasswordDto } from "../dto/ChangePasswordDto";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IPasswordHasher } from "../../domain/interfaces/IPasswordHasher";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../../config/types";
import { IChangePasswordUseCase } from "../../domain/interfaces/use-cases/IChangePasswordUsecase";
import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { ErrorMessages } from "../../../../shared/constant/ErrorMessages";

@injectable()
export class ChangePasswordUseCase implements IChangePasswordUseCase {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,
    @inject(TYPES.PasswordHasher)
    private readonly passwordHasher: IPasswordHasher
  ) { }

  async execute(userId: string, dto: ChangePasswordDto): Promise<void> {
    
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError(ErrorMessages.USER_NOT_FOUND,HttpStatusCode.NOT_FOUND);
    }

    const isPasswordValid = await this.passwordHasher.compare(
      dto.currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      throw new AppError("Current password is incorrect",HttpStatusCode.BAD_REQUEST);
    }

    const isSamePassword = await this.passwordHasher.compare(
      dto.newPassword,
      user.password
    );

    if (isSamePassword) {
      throw new AppError("New password must be different from current password",HttpStatusCode.BAD_REQUEST);
    }

    const hashedPassword = await this.passwordHasher.hash(
      dto.newPassword
    );

    await this.userRepository.updatePassword(
      user.email,
      hashedPassword
    );
  }
}