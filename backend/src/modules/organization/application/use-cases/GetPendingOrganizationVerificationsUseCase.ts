import {
  IOrganizationVerificationRepository,
  PendingOrganizationVerification,
} from "../../domain/repositories/IOrganizationVerificationRepository";

import { IGetPendingOrganizationVerificationsUseCase } from "../../domain/interfaces/IGetPendingOrganizationVerificationsUseCase";

export class GetPendingOrganizationVerificationsUseCase  implements IGetPendingOrganizationVerificationsUseCase
{
  constructor(
    private readonly verificationRepository: IOrganizationVerificationRepository,
  ) {}

  async execute(): Promise<PendingOrganizationVerification[]> {
    return this.verificationRepository.findPending();
  }
}