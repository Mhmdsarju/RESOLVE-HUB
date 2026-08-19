import { inject, injectable } from "inversify";

import { TYPES } from "../../../../config/types";

import { OrganizationVerification } from "../../domain/entities/organizationVerification.entity";
import { IOrganizationVerificationRepository } from "../../domain/repositories/IOrganizationVerificationRepository";
import { IGetOrganizationVerificationUseCase } from "../../domain/interfaces/IGetOrganizationVerificationUseCase";

@injectable()
export class GetOrganizationVerificationUseCase
  implements IGetOrganizationVerificationUseCase {
  constructor(
    @inject(TYPES.OrganizationVerificationRepository)
    private readonly verificationRepository: IOrganizationVerificationRepository,
  ) { }

  async execute(organizationId: string,): Promise<OrganizationVerification | null> {
    return this.verificationRepository.findLatestByOrganizationId(
      organizationId,
    );
  }
}