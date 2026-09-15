import { AppError } from "../../../../shared/errors/AppError";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
// import { ErrorMessages } from "../../../../shared/constant/ErrorMessages";

import {
  IOrganizationVerificationRepository,
  OrganizationVerificationDetails,
} from "../../domain/repositories/IOrganizationVerificationRepository";

import { IGetOrganizationVerificationDetailsUseCase } from "../../domain/interfaces/IGetOrganizationVerificationDetailsUseCase";

export class GetOrganizationVerificationDetailsUseCase
  implements IGetOrganizationVerificationDetailsUseCase {
  constructor(
    private readonly verificationRepository: IOrganizationVerificationRepository,
  ) { }

  async execute(organizationId: string,): Promise<OrganizationVerificationDetails> {
    const details = await this.verificationRepository.findDetailsByOrganizationId(
      organizationId,
    );

    if (!details) {
      throw new AppError("Organization verification not found", HttpStatusCode.NOT_FOUND,);
    }

    return details;
  }
}