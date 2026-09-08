import { IAIAnalysisResult } from "./IAIAnalysisResult";

export interface IGenerateRAGIncidentAnalysisUseCase {
    execute(incidentId: string, organizationId: string): Promise<IAIAnalysisResult>;
}