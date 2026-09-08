import { IAIAnalysisResult } from "./IAIAnalysisResult";

export interface IGetAIAnalysisUseCase {
    execute(incidentId: string, organizationId: string): Promise<IAIAnalysisResult | null>;
}