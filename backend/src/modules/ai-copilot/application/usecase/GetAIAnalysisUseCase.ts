import { IGetAIAnalysisUseCase } from "../../domain/interface/IGetAIAnalysisUseCase"; 
import { IAIIncidentAnalysisRepository } from "../../domain/interface/IAIIncidentAnalysisRepository";
import { IAIAnalysisResult } from "../../domain/interface/IAIAnalysisResult";

export class GetAIAnalysisUseCase implements IGetAIAnalysisUseCase {
    constructor(
        private readonly aiIncidentAnalysisRepository: IAIIncidentAnalysisRepository
    ) { }

    async execute(incidentId: string, organizationId: string): Promise<IAIAnalysisResult | null> {

        const analysis = await this.aiIncidentAnalysisRepository.findLatestByIncidentId(
            incidentId,
            organizationId
        );

        if (!analysis) {
            return null;
        }

        return {
            summary: analysis.summary,
            possibleRootCause: analysis.possibleRootCause,
            initialRecommendation: analysis.initialRecommendation,
        };
    }
}