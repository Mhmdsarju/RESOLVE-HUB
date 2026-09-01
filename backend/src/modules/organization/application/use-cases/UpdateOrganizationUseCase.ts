import { AppError } from "../../../../shared/errors/AppError";
import { Organization } from "../../domain/entities/Organization";
import { UpdateOrganizationDto } from "../dto/UpdateOrganizationDto";
import { IOrganizationRepository } from "../../domain/repositories/IOrganizationRepository";
import { HttpStatusCode } from "../../../../shared/constant/HttpStatusCode";
import { IUpdateOrganizationUseCase } from "../../domain/interfaces/IUpdateOrganizationUseCase";
import { ErrorMessages } from "../../../../shared/constant/ErrorMessages";
import { ICreateAuditLogUseCase } from "@/modules/audit-log/domain/interface/usecase/ICreateAuditLogUseCase";
import { AuditAction, AuditEntityType } from "@/modules/audit-log/domain/enums/auditLog.enum";

export class UpdateOrganizationUseCase implements IUpdateOrganizationUseCase {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
    private readonly createAuditLogUseCase: ICreateAuditLogUseCase,
  ) { }

  async execute(organizationId: string, dto: UpdateOrganizationDto, userId?: string | null,): Promise<Organization> {
    const organization = await this.organizationRepository.findById(organizationId);

    if (!organization) {
      throw new AppError(ErrorMessages.ORGANIZATION_NOT_FOUND, HttpStatusCode.NOT_FOUND,);
    }

    organization.name = dto.name;
    organization.industry = dto.industry;
    organization.companySize = dto.companySize;
    organization.website = dto.website ?? null;
    organization.description = dto.description ?? null;
    organization.phone = dto.phone ?? null;
    organization.country = dto.country ?? null;
    organization.state = dto.state ?? null;
    organization.city = dto.city ?? null;
    organization.address = dto.address ?? null;

    const updatedOrganization = await this.organizationRepository.update(
      organization.id!,
      {
        name: organization.name,
        industry: organization.industry,
        companySize: organization.companySize,
        website: organization.website,
        description: organization.description,
        phone: organization.phone,
        country: organization.country,
        state: organization.state,
        city: organization.city,
        address: organization.address,
      },
    );

    await this.createAuditLogUseCase.execute({
      organizationId: organization.id!,
      action: AuditAction.ORGANIZATION_UPDATED,
      entityType: AuditEntityType.ORGANIZATION,
      entityId: organization.id!,
      description: "Organization profile updated ",
      actorId: userId ?? null,
    });

    return updatedOrganization;
  }
}