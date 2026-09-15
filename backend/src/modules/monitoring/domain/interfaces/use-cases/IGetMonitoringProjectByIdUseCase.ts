import { MonitoringProject } from "../../entities/monitoringProject.entity";

export interface IGetMonitoringProjectByIdUseCase {
  execute(id: string, organizationId: string): Promise<MonitoringProject>;
}