import { OrganizationVerificationDetails } from "../repositories/IOrganizationVerificationRepository";

export interface IGetOrganizationVerificationDetailsUseCase {
  execute(organizationId: string,): Promise<OrganizationVerificationDetails>;
}