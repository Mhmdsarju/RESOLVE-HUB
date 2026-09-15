import { PendingOrganizationVerification } from "../repositories/IOrganizationVerificationRepository";

export interface IGetPendingOrganizationVerificationsUseCase {
  execute(): Promise<PendingOrganizationVerification[]>;
}