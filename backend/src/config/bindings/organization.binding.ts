import { Container } from "inversify";
import { TYPES } from "../types";


import { IOrganizationRepository } from "@/modules/organization/domain/repositories/IOrganizationRepository";
import { PrismaOrganizationRepository } from "@/modules/organization/infrastructure/repositories/PrismaOrganizationRepository";

import { IGetOrganizationProfileUseCase } from "@/modules/organization/domain/interfaces/IGetOrganizationProfileUseCase";
import { GetOrganizationProfileUseCase } from "@/modules/organization/application/use-cases/GetOrganizationProfileUseCase";

import { IUpdateOrganizationUseCase } from "@/modules/organization/domain/interfaces/IUpdateOrganizationUseCase";
import { UpdateOrganizationUseCase } from "@/modules/organization/application/use-cases/UpdateOrganizationUseCase";
import { OrganizationController } from "@/modules/organization/presentation/controllers/OrganizationController";


export function bindOrganization(container: Container) {

    container.bind<IOrganizationRepository>(TYPES.OrganizationRepository).to(PrismaOrganizationRepository).inSingletonScope();
    container.bind<IGetOrganizationProfileUseCase>(TYPES.GetOrganizationProfileUseCase).to(GetOrganizationProfileUseCase).inSingletonScope();
    container.bind<IUpdateOrganizationUseCase>(TYPES.UpdateOrganizationUseCase).to(UpdateOrganizationUseCase).inSingletonScope();
    container.bind<OrganizationController>(TYPES.OrganizationController).to(OrganizationController).inSingletonScope();

}