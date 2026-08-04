import { AppError } from "../../../../shared/errors/AppError";

import { Organization } from "../../domain/entities/Organization";
import { UpdateOrganizationDto } from "../dto/UpdateOrganizationDto"; 
import { IOrganizationRepository } from "../../domain/repositories/IOrganizationRepository";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { IUpdateOrganizationUseCase } from "../../domain/interfaces/IUpdateOrganizationUseCase";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../../config/types";
import { ErrorMessages } from "../../../../shared/constant/ErrorMessages";

@injectable()
export class UpdateOrganizationUseCase implements IUpdateOrganizationUseCase {
  constructor(
    @inject(TYPES.OrganizationRepository)
    private readonly organizationRepository: IOrganizationRepository
  ) { }

  async execute(organizationId: string,dto: UpdateOrganizationDto): Promise<Organization> {
    const organization = await this.organizationRepository.findById(
      organizationId
    );

    if (!organization) {
      throw new AppError(ErrorMessages.ORGANIZATION_NOT_FOUND, HttpStatusCode.NOT_FOUND);
    }

    organization.name = dto.name;
    organization.industry = dto.industry;
    organization.companySize = dto.companySize;

    return await this.organizationRepository.update(
      organization.id!,
      {
        name: organization.name,
        industry: organization.industry,
        companySize: organization.companySize,
      }
    );
  }
}