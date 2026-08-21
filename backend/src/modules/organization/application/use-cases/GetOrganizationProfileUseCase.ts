import { Organization } from "../../domain/entities/Organization";

import { IOrganizationRepository } from "../../domain/repositories/IOrganizationRepository";
import { IGetOrganizationProfileUseCase } from "../../domain/interfaces/IGetOrganizationProfileUseCase";
import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";

import { ErrorMessages } from "../../../../shared/constant/ErrorMessages";

export class GetOrganizationProfileUseCase implements IGetOrganizationProfileUseCase {
  constructor(
    private readonly organizationRepository: IOrganizationRepository
  ) {}

  async execute(organizationId: string): Promise<Organization> {
    const organization = await this.organizationRepository.findById(
      organizationId
    );

    if (!organization) {
      throw new AppError(ErrorMessages.ORGANIZATION_NOT_FOUND,HttpStatusCode.NOT_FOUND);
    }

    return organization;
  }
}