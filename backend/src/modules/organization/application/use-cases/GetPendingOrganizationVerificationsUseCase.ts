import { inject, injectable } from "inversify";

import { TYPES } from "../../../../config/types";

import {
  IOrganizationVerificationRepository,
  PendingOrganizationVerification,
} from "../../domain/repositories/IOrganizationVerificationRepository";

import { IGetPendingOrganizationVerificationsUseCase } from "../../domain/interfaces/IGetPendingOrganizationVerificationsUseCase";

@injectable()
export class GetPendingOrganizationVerificationsUseCase
  implements IGetPendingOrganizationVerificationsUseCase
{
  constructor(
    @inject(TYPES.OrganizationVerificationRepository)
    private readonly verificationRepository: IOrganizationVerificationRepository,
  ) {}

  async execute(): Promise<PendingOrganizationVerification[]> {
    return this.verificationRepository.findPending();
  }
}