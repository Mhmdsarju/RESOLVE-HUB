import { inject, injectable } from "inversify";

import { TYPES } from "@/config/types";

import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import { IGetUsersByOrganizationUseCase } from "../../domain/interfaces/use-cases/IGetUsersByOrganizationUseCase";

@injectable()
export class GetUsersByOrganizationUseCase implements IGetUsersByOrganizationUseCase{
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(    organizationId: string,  ): Promise<User[]> {
    return this.userRepository.findUsersByOrganizationId(
      organizationId,
    );
  }
}