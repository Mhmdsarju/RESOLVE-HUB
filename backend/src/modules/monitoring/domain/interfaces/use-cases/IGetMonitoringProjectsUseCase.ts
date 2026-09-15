import { MonitoringProject } from "../../entities/monitoringProject.entity";
import { GetMonitoringProjectsDTO } from "@/modules/monitoring/application/dto/GetMonitoringProjectsDTO";

export interface IGetMonitoringProjectsUseCase {
    execute(dto: GetMonitoringProjectsDTO): Promise<{ 
        data: MonitoringProject[]; 
        total: number; 
    }>;
}