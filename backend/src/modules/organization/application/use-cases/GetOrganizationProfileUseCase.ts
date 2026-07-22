import { Organization } from "../../../auth/domain/entities/Organization";

import { IOrganizationRepository } from "../../domain/repositories/IOrganizationRepository";

export class GetOrganizationProfileUseCase {
  constructor(
    private readonly organizationRepository: IOrganizationRepository
  ) {}

  async execute(organizationId: string): Promise<Organization> {
    const organization = await this.organizationRepository.findById(
      organizationId
    );

    if (!organization) {
      throw new Error("Organization not found");
    }

    return organization;
  }
}