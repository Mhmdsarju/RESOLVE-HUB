import { AIIncidentAnalysis } from "@prisma/client";

export interface IAIIncidentAnalysisRepository {
    create(data: {
        incidentId: string;
        organizationId: string;
        summary: string;
        possibleRootCause: string;
        initialRecommendation: string;
        evidence: {
            content: string;
            similarity: number;
        }[];
        model: string;
        promptVersion: string;
    }): Promise<AIIncidentAnalysis>;


    findLatestByIncidentId(incidentId: string, organizationId: string): Promise<AIIncidentAnalysis | null>;


}