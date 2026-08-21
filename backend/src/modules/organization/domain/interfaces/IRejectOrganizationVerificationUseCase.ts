import { OrganizationVerification } from "../entities/organizationVerification.entity";

export interface IRejectOrganizationVerificationUseCase {
  execute(organizationId: string, reviewerId: string, reason: string,): Promise<OrganizationVerification>;
}