import { inject, injectable } from "inversify";

import { TYPES } from "../../../../config/types";

import { UpdateOrganizationProfileDto } from "../../application/dto/UpdateOrganizationProfileDto";
import { IOrganizationRepository } from "../../domain/repositories/IOrganizationRepository";
import { IUpdateOrganizationProfileUseCase } from "../../domain/interfaces/IUpdateOrganizationProfileUseCase";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

@injectable()
export class UpdateOrganizationProfileUseCase implements IUpdateOrganizationProfileUseCase {
  constructor(
    @inject(TYPES.OrganizationRepository)
    private readonly organizationRepository: IOrganizationRepository,
  ) { }

  async execute(organizationId: string, data: UpdateOrganizationProfileDto,): Promise<void> {
    const organization = await this.organizationRepository.findById(organizationId);

    if (!organization) {
      throw new AppError("Organization not found", HttpStatusCode.NOT_FOUND);
    }

    await this.organizationRepository.update(organizationId, data,);
  }
}