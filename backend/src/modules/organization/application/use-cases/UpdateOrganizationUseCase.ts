import { AppError } from "../../../../shared/errors/AppError";

import { Organization } from "../../../auth/domain/entities/Organization";
import { UpdateOrganizationDto } from "../dto/UpdateOrganizationDto";
import { IOrganizationRepository } from "../../domain/repositories/IOrganizationRepository";

export class UpdateOrganizationUseCase {
  constructor(
    private readonly organizationRepository: IOrganizationRepository
  ) {}

  async execute(
    organizationId: string,
    dto: UpdateOrganizationDto
  ): Promise<Organization> {
    const organization = await this.organizationRepository.findById(
      organizationId
    );

    if (!organization) {
      throw new AppError("Organization not found", 404);
    }

    organization.name = dto.name;
    organization.industry = dto.industry;
    organization.companySize = dto.companySize;

    return await this.organizationRepository.update(organization);
  }
}