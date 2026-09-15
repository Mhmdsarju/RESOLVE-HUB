import { api } from "@/core/api/axios";
import { ENDPOINTS } from "@/core/api/endpoints";
import type { ApiResponse } from "@/core/types/api.types";

import type { AIAnalysisResult } from "../types/ai.types";


export async function generateAIIncidentAnalysis(incidentId: string,): Promise<AIAnalysisResult> {
    const response = await api.post<ApiResponse<AIAnalysisResult>>(
        ENDPOINTS.AI.INCIDENT_RAG_ANALYSIS(incidentId),
    );

    return response.data.data;
}

export async function getLatestAIIncidentAnalysis(incidentId: string,): Promise<AIAnalysisResult | null> {
    const response = await api.get<ApiResponse<AIAnalysisResult | null>>(
        ENDPOINTS.AI.ANALYSIS(incidentId),
    );

    return response.data.data;
}