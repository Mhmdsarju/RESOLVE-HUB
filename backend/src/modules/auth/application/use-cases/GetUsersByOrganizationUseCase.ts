import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { IGetUsersByOrganizationUseCase } from "../../domain/interfaces/use-cases/IGetUsersByOrganizationUseCase";

export class GetUsersByOrganizationUseCase implements IGetUsersByOrganizationUseCase{
  constructor(
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(    organizationId: string,  ): Promise<User[]> {
    return this.userRepository.findUsersByOrganizationId(
      organizationId,
    );
  }
}