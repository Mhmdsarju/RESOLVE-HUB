import { IAuthRepository } from "../../domain/repositories/IAuthRepository";

export class GetCurrentUserUseCase {
  constructor(
    private readonly authRepository: IAuthRepository
  ) {}

  async execute(userId: string) {
    const user = await this.authRepository.findUserById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      organizationId: user.organizationId,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}