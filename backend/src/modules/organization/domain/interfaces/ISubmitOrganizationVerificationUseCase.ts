import { OrganizationVerification } from "../entities/organizationVerification.entity";
export interface ISubmitOrganizationVerificationUseCase {
  execute(organizationId: string,): Promise<OrganizationVerification>;
}