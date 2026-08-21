import { OrganizationVerification } from "../../domain/entities/organizationVerification.entity";
import { IOrganizationVerificationRepository } from "../../domain/repositories/IOrganizationVerificationRepository";
import { IGetOrganizationVerificationUseCase } from "../../domain/interfaces/IGetOrganizationVerificationUseCase";

export class GetOrganizationVerificationUseCase  implements IGetOrganizationVerificationUseCase {
  constructor(
    private readonly verificationRepository: IOrganizationVerificationRepository,
  ) { }

  async execute(organizationId: string,): Promise<OrganizationVerification | null> {
    return this.verificationRepository.findLatestByOrganizationId(
      organizationId,
    );
  }
}