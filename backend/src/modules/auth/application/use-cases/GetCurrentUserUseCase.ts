import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { GetUserDto } from "../dto/GetCurrentUserDto";
import { IGetCurrentUseCase } from "../../domain/interfaces/use-cases/IGetCurrentUseCase";
import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { ErrorMessages } from "../../../../shared/constant/ErrorMessages";

export class GetCurrentUserUseCase implements IGetCurrentUseCase {
  constructor(
    private readonly userRepository: IUserRepository
  ) { }

  async execute(dto: GetUserDto) {
    const user = await this.userRepository.findById(dto.userId);

    if (!user) {
      throw new AppError(ErrorMessages.USER_NOT_FOUND, HttpStatusCode.NOT_FOUND);
    }

    return {
      id: user.id!,
      organizationId: user.organizationId!,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}