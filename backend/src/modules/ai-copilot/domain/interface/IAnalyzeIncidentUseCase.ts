import { IAIAnalysisResult } from "./IAIAnalysisResult";

export interface IAnalyzeIncidentUseCase {
    execute(incidentId: string, organizationId: string): Promise<IAIAnalysisResult>
}