import { IMonitoringProjectRepository } from "@/modules/monitoring/domain/interfaces/IMonitoringProjectRepository";
import { Container } from "inversify";
import { TYPES } from "../types";
import { PrismaMonitoringProjectRepository } from "@/modules/monitoring/infrastructure/repositories/PrismaMonitoringProjectRepository";
import { ICreateMonitoringProjectUseCase } from "@/modules/monitoring/domain/interfaces/use-cases/ICreateMonitoringProjectUseCase";
import { CreateMonitoringProjectUseCase } from "@/modules/monitoring/application/use-cases/CreateMonitoringProjectUseCase";
import { MonitoringProjectController } from "@/modules/monitoring/presentation/controllers/MonitoringProjectController";
import { IGetMonitoringProjectsUseCase } from "@/modules/monitoring/domain/interfaces/use-cases/IGetMonitoringProjectsUseCase";
import { GetMonitoringProjectsUseCase } from "@/modules/monitoring/application/use-cases/GetMonitoringProjectsUseCase";
import { IGetMonitoringProjectByIdUseCase } from "@/modules/monitoring/domain/interfaces/use-cases/IGetMonitoringProjectByIdUseCase";
import { GetMonitoringProjectByIdUseCase } from "@/modules/monitoring/application/use-cases/GetMonitoringProjectByIdUseCase";
import { IUpdateMonitoringProjectUseCase } from "@/modules/monitoring/domain/interfaces/use-cases/IUpdateMonitoringProjectUseCase";
import { UpdateMonitoringProjectUseCase } from "@/modules/monitoring/application/use-cases/updateMonitoringProjectUseCase";
import { IDeleteMonitoringProjectUseCase } from "@/modules/monitoring/domain/interfaces/use-cases/IDeleteMonitoringProjectUseCase";
import { DeleteMonitoringProjectUseCase } from "@/modules/monitoring/application/use-cases/deleteMonitoringProject.usecase";

export function bindMonitoring(container:Container){
    container.bind<IMonitoringProjectRepository>(TYPES.MonitoringProjectRepository).to(PrismaMonitoringProjectRepository).inSingletonScope();
    container.bind<MonitoringProjectController>(TYPES.MonitoringProjectController).to(MonitoringProjectController).inSingletonScope();

    container.bind<ICreateMonitoringProjectUseCase>(TYPES.CreateMonitoringProjectUseCase).to(CreateMonitoringProjectUseCase).inSingletonScope();
    container.bind<IGetMonitoringProjectsUseCase>(TYPES.getMonitoringProjectsUseCase).to(GetMonitoringProjectsUseCase).inSingletonScope();
    container.bind<IGetMonitoringProjectByIdUseCase>(TYPES.getMonitoringProjectByIdUseCase).to(GetMonitoringProjectByIdUseCase).inSingletonScope();
    container.bind<IUpdateMonitoringProjectUseCase>(TYPES.updateMonitoringProjectUseCase).to(UpdateMonitoringProjectUseCase).inSingletonScope();
    container.bind<IDeleteMonitoringProjectUseCase>(TYPES.deleteMonitoringProjectUseCase).to(DeleteMonitoringProjectUseCase).inSingletonScope();
}