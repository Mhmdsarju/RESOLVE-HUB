import { IGenerateRAGIncidentAnalysisUseCase } from "../../domain/interface/IGenerateRAGIncidentAnalysisUseCase";
import { IGetIncidentByIdUseCase } from "@/modules/incident/domain/interfaces/use-cases/IGetIncidentByIdUseCase";
import { IRAGChain } from "../../domain/interface/IRAGChain";
import { IAIAnalysisResult } from "../../domain/interface/IAIAnalysisResult";
import { IAIIncidentAnalysisRepository } from "../../domain/interface/IAIIncidentAnalysisRepository";

export class GenerateRAGIncidentAnalysisUseCase implements IGenerateRAGIncidentAnalysisUseCase {

    constructor(
        private readonly getIncidentByIdUseCase: IGetIncidentByIdUseCase,
        private readonly ragChain: IRAGChain,
        private readonly aiIncidentAnalysisRepository: IAIIncidentAnalysisRepository
    ) { }

    async execute(incidentId: string, organizationId: string): Promise<IAIAnalysisResult> {

        const incident = await this.getIncidentByIdUseCase.execute(
            incidentId,
            organizationId
        );

        const result = await this.ragChain.execute({
            title: incident.title,
            description: incident.description ?? null,
            severity: incident.severity,
            priority: incident.priority,
            status: incident.status,
            type: incident.type,
        }, organizationId);

        await this.aiIncidentAnalysisRepository.create({
            incidentId,
            organizationId,
            summary: result.summary,
            possibleRootCause: result.possibleRootCause,
            initialRecommendation: result.initialRecommendation,
            model: "gemini-3.6-flash",
            promptVersion: "rag-v1",
        });

        return result;
    }
}