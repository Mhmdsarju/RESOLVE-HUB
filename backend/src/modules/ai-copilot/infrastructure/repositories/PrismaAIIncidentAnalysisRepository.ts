import { AIIncidentAnalysis } from "@prisma/client";

import { IAIIncidentAnalysisRepository } from "../../domain/interface/IAIIncidentAnalysisRepository";
import { prisma } from "@/config/database";

export class PrismaAIIncidentAnalysisRepository implements IAIIncidentAnalysisRepository {

    async create(data: {
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
    }): Promise<AIIncidentAnalysis> {

        return prisma.aIIncidentAnalysis.create({
            data,
        });
    }

    async findLatestByIncidentId(incidentId: string, organizationId: string): Promise<AIIncidentAnalysis | null> {
        return prisma.aIIncidentAnalysis.findFirst({
            where: {
                incidentId,
                organizationId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

}