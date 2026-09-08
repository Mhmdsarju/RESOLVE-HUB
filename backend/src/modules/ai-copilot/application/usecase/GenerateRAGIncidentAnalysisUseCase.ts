import { IGenerateRAGIncidentAnalysisUseCase } from "../../domain/interface/IGenerateRAGIncidentAnalysisUseCase";
import { createIncidentCopilotGraph } from "../../infrastructure/langgraph/IncidentCopilotGraph";
import { IAIAnalysisResult } from "../../domain/interface/IAIAnalysisResult";
import { IAIIncidentAnalysisRepository } from "../../domain/interface/IAIIncidentAnalysisRepository";

export class GenerateRAGIncidentAnalysisUseCase implements IGenerateRAGIncidentAnalysisUseCase {

    constructor(
        private readonly incidentCopilotGraph: ReturnType<typeof createIncidentCopilotGraph>,
        private readonly aiIncidentAnalysisRepository: IAIIncidentAnalysisRepository
    ) { }

    async execute(incidentId: string, organizationId: string): Promise<IAIAnalysisResult> {

        const result = await this.incidentCopilotGraph.invoke({
            incidentId,
            organizationId,

            incident: {
                title: "",
                description: null,
                severity: "",
                priority: "",
                status: "",
                type: "",
            },

            retrievedDocuments: [],
            evidence: [],
            summary: null,
            rootCause: null,
            recommendation: null,
            retryCount: 0,
        });

        const analysisResult: IAIAnalysisResult = {
            summary: result.summary
                ?? "Unable to generate an AI summary.",
            possibleRootCause: result.rootCause
                ?? "Insufficient evidence to determine the root cause.",
            initialRecommendation: result.recommendation
                ?? "Collect more information before taking corrective action.",
            evidence: result.evidence.map((chunk) => ({
                content: chunk.content,
                similarity: chunk.similarity,
            })),
        };

        await this.aiIncidentAnalysisRepository.create({
            incidentId,
            organizationId,
            summary: analysisResult.summary,
            possibleRootCause: analysisResult.possibleRootCause,
            initialRecommendation: analysisResult.initialRecommendation,
            model: "gemini-3.6-flash",
            promptVersion: "rag-v1",
        });

        return analysisResult;
    }
}

