import { Organization } from "../../domain/entities/Organization";

import { IOrganizationRepository } from "../../domain/repositories/IOrganizationRepository";
import { IGetOrganizationProfileUseCase } from "../../domain/interfaces/IGetOrganizationProfileUseCase";
import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { injectable,inject } from "inversify";
import { TYPES } from "../../../../config/types";

@injectable()
export class GetOrganizationProfileUseCase implements IGetOrganizationProfileUseCase {
  constructor(
    @inject(TYPES.OrganizationRepository)
    private readonly organizationRepository: IOrganizationRepository
  ) {}

  async execute(organizationId: string): Promise<Organization> {
    const organization = await this.organizationRepository.findById(
      organizationId
    );

    if (!organization) {
      throw new AppError("Organization not found",HttpStatusCode.NOT_FOUND);
    }

    return organization;
  }
}