import { IAIAnalysisResult } from "../IAIAnalysisResult";

export interface IGenerateIncidentCopilotGraph {

    execute(incidentId: string, organizationId: string): Promise<IAIAnalysisResult>;

}