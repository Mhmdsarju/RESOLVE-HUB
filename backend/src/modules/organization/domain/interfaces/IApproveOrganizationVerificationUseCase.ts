import { OrganizationVerification } from "../entities/organizationVerification.entity";

export interface IApproveOrganizationVerificationUseCase {
  execute(organizationId: string, reviewerId: string,): Promise<OrganizationVerification>;
}