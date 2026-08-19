import { Container } from "inversify";
import { TYPES } from "../types";


import { IOrganizationRepository } from "@/modules/organization/domain/repositories/IOrganizationRepository";
import { PrismaOrganizationRepository } from "@/modules/organization/infrastructure/repositories/PrismaOrganizationRepository";

import { IGetOrganizationProfileUseCase } from "@/modules/organization/domain/interfaces/IGetOrganizationProfileUseCase";
import { GetOrganizationProfileUseCase } from "@/modules/organization/application/use-cases/GetOrganizationProfileUseCase";

import { IUpdateOrganizationUseCase } from "@/modules/organization/domain/interfaces/IUpdateOrganizationUseCase";
import { UpdateOrganizationUseCase } from "@/modules/organization/application/use-cases/UpdateOrganizationUseCase";
import { OrganizationController } from "@/modules/organization/presentation/controllers/OrganizationController";
import { ISubmitOrganizationVerificationUseCase } from "@/modules/organization/domain/interfaces/ISubmitOrganizationVerificationUseCase";
import { SubmitOrganizationVerificationUseCase } from "@/modules/organization/application/use-cases/SubmitOrganizationVerificationUseCase";
import { IApproveOrganizationVerificationUseCase } from "@/modules/organization/domain/interfaces/IApproveOrganizationVerificationUseCase";
import { ApproveOrganizationVerificationUseCase } from "@/modules/organization/application/use-cases/ApproveOrganizationVerificationUseCase";
import { IRejectOrganizationVerificationUseCase } from "@/modules/organization/domain/interfaces/IRejectOrganizationVerificationUseCase";
import { RejectOrganizationVerificationUseCase } from "@/modules/organization/application/use-cases/RejectOrganizationVerificationUseCase";
import { SuperAdminOrganizationController } from "@/modules/organization/presentation/controllers/SuperAdminOrganizationController";
import { IOrganizationVerificationRepository } from "@/modules/organization/domain/repositories/IOrganizationVerificationRepository";
import { PrismaOrganizationVerificationRepository } from "@/modules/organization/infrastructure/repositories/PrismaOrganizationVerificationRepository";
import { IGetPendingOrganizationVerificationsUseCase } from "@/modules/organization/domain/interfaces/IGetPendingOrganizationVerificationsUseCase";
import { GetPendingOrganizationVerificationsUseCase } from "@/modules/organization/application/use-cases/GetPendingOrganizationVerificationsUseCase";
import { IGetOrganizationVerificationUseCase } from "@/modules/organization/domain/interfaces/IGetOrganizationVerificationUseCase";
import { GetOrganizationVerificationUseCase } from "@/modules/organization/application/use-cases/GetOrganizationVerificationUseCase";
import { IGetOrganizationVerificationDetailsUseCase } from "@/modules/organization/domain/interfaces/IGetOrganizationVerificationDetailsUseCase";
import { GetOrganizationVerificationDetailsUseCase } from "@/modules/organization/application/use-cases/GetOrganizationVerificationDetailsUseCase";
import { IOrganizationEmailService } from "@/modules/organization/domain/interfaces/IOrganizationEmailService";
import { NodemailerOrganizationEmailService } from "@/modules/organization/infrastructure/services/NodemailerOrganizationEmailService";


export function bindOrganization(container: Container) {

    container.bind<IOrganizationRepository>(TYPES.OrganizationRepository).to(PrismaOrganizationRepository).inSingletonScope();
    container.bind<IOrganizationVerificationRepository>(TYPES.OrganizationVerificationRepository).to(PrismaOrganizationVerificationRepository).inSingletonScope();
    container.bind<OrganizationController>(TYPES.OrganizationController).to(OrganizationController).inSingletonScope();
    container.bind<SuperAdminOrganizationController>(TYPES.SuperAdminOrganizationController).to(SuperAdminOrganizationController);
    container.bind<IGetOrganizationProfileUseCase>(TYPES.GetOrganizationProfileUseCase).to(GetOrganizationProfileUseCase);
    container.bind<IUpdateOrganizationUseCase>(TYPES.UpdateOrganizationUseCase).to(UpdateOrganizationUseCase);
    container.bind<ISubmitOrganizationVerificationUseCase>(TYPES.SubmitOrganizationVerificationUseCase).to(SubmitOrganizationVerificationUseCase);
    container.bind<IApproveOrganizationVerificationUseCase>(TYPES.ApproveOrganizationVerificationUseCase).to(ApproveOrganizationVerificationUseCase);
    container.bind<IRejectOrganizationVerificationUseCase>(TYPES.RejectOrganizationVerificationUseCase).to(RejectOrganizationVerificationUseCase);
    container.bind<IGetPendingOrganizationVerificationsUseCase>(TYPES.GetPendingOrganizationVerificationsUseCase).to(GetPendingOrganizationVerificationsUseCase);
    container.bind<IGetOrganizationVerificationUseCase>(TYPES.GetOrganizationVerificationUseCase).to(GetOrganizationVerificationUseCase);
    container.bind<IGetOrganizationVerificationDetailsUseCase>(TYPES.GetOrganizationVerificationDetailsUseCase).to(GetOrganizationVerificationDetailsUseCase);
    container.bind<IOrganizationEmailService>(TYPES.OrganizationEmailService).to(NodemailerOrganizationEmailService).inSingletonScope();
}