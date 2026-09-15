import { OrganizationVerification } from "../entities/organizationVerification.entity";

export interface IGetOrganizationVerificationUseCase {
  execute(organizationId: string,): Promise<OrganizationVerification | null>;
}