import { IAlertRepository } from "@/modules/alert/domain/interfaces/IAlertRepository";
import { Container } from "inversify";
import { TYPES } from "../types";
import { PrismaAlertRepository } from "@/modules/alert/infrastructure/repositories/PrismaAlertRepository";
import { AlertController } from "@/modules/alert/presentation/controllers/AlertController";
import { ICreateAlertUseCase } from "@/modules/alert/domain/interfaces/use-case/ICreateAlertUseCase";
import { CreateAlertUseCase } from "@/modules/alert/application/use-cases/createAlertUseCase";
import { IGetAlertsUseCase } from "@/modules/alert/domain/interfaces/use-case/IGetAlertsUseCase";
import { GetAlertsUseCase } from "@/modules/alert/application/use-cases/getAlertsUseCase";
import { IGetAlertByIdUseCase } from "@/modules/alert/domain/interfaces/use-case/IGetAlertByIdUseCase";
import { GetAlertByIdUseCase } from "@/modules/alert/application/use-cases/getAlertByIdUseCase";
import { IResolveAlertUseCase } from "@/modules/alert/domain/interfaces/use-case/IResolveAlertUseCase";
import { ResolveAlertUseCase } from "@/modules/alert/application/use-cases/resolveAlertUseCase";
import { IProcessAlertUseCase } from "@/modules/alert/domain/interfaces/IProcessAlertUseCase";
import { ProcessAlertUseCase } from "@/modules/alert/application/use-cases/ProcessAlertUseCase";

export function bindAlert(container:Container){
    container.bind<IAlertRepository>(TYPES.AlertRepository).to(PrismaAlertRepository).inSingletonScope();
    container.bind<AlertController>(TYPES.AlertController).to(AlertController).inSingletonScope();
    container.bind<ICreateAlertUseCase>(TYPES.CreateAlertUseCase).to(CreateAlertUseCase)
    container.bind<IGetAlertsUseCase>(TYPES.GetAlertsUseCase).to(GetAlertsUseCase)
    container.bind<IGetAlertByIdUseCase>(TYPES.GetAlertByIdUseCase).to(GetAlertByIdUseCase)
    container.bind<IResolveAlertUseCase>(TYPES.ResolveAlertUseCase).to(ResolveAlertUseCase)
    container.bind<IProcessAlertUseCase>(TYPES.ProcessAlertUseCase).to(ProcessAlertUseCase)
}