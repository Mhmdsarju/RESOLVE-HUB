import { IIntegrationRepository } from "@/modules/integration/domain/interfaces/IIntegrationRepository";
import { Container } from "inversify";
import { TYPES } from "../types";
import { PrismaIntegrationRepository } from "@/modules/integration/infrastructure/repositories/PrismaIntegrationRepository";
import { ICreateIntegrationUseCase } from "@/modules/integration/domain/interfaces/use-cases/ICreateIntegrationUseCase";
import { CreateIntegrationUseCase } from "@/modules/integration/application/use-cases/CreateIntegrationUseCase";
import { IntegrationController } from "@/modules/integration/presentation/controllers/IntegrationController";
import { IGetIntegrationsUseCase } from "@/modules/integration/domain/interfaces/use-cases/IGetIntegrationsUseCase";
import { GetIntegrationsUseCase } from "@/modules/integration/application/use-cases/GetIntegrationsUseCase";
import { IGetIntegrationByIdUseCase } from "@/modules/integration/domain/interfaces/use-cases/IGetIntegrationByIdUseCase";
import { GetIntegrationByIdUseCase } from "@/modules/integration/application/use-cases/GetIntegrationByIdUseCase";
import { IUpdateIntegrationUseCase } from "@/modules/integration/domain/interfaces/use-cases/IUpdateIntegrationUseCase";
import { UpdateIntegrationUseCase } from "@/modules/integration/application/use-cases/UpdateIntegrationUseCase";
import { IDeleteIntegrationUseCase } from "@/modules/integration/domain/interfaces/use-cases/IDeleteIntegrationUseCase";
import { DeleteIntegrationUseCase } from "@/modules/integration/application/use-cases/DeleteIntegrationUseCase";

export function bindIntegration(container:Container){
    container.bind<IIntegrationRepository>(TYPES.IntegrationRepository).to(PrismaIntegrationRepository).inSingletonScope();
    container.bind<IntegrationController>(TYPES.IntegrationController).to(IntegrationController).inSingletonScope();
    container.bind<ICreateIntegrationUseCase>(TYPES.CreateIntegrationUseCase).to(CreateIntegrationUseCase).inSingletonScope();
    container.bind<IGetIntegrationsUseCase>(TYPES.getIntegrationsUseCase).to(GetIntegrationsUseCase).inSingletonScope();
    container.bind<IGetIntegrationByIdUseCase>(TYPES.GetIntegrationByIdUseCase).to(GetIntegrationByIdUseCase).inSingletonScope();
    container.bind<IUpdateIntegrationUseCase>(TYPES.UpdateIntegrationUseCase).to(UpdateIntegrationUseCase).inSingletonScope();
    container.bind<IDeleteIntegrationUseCase>(TYPES.DeleteIntegrationUseCase).to(DeleteIntegrationUseCase).inSingletonScope();
}