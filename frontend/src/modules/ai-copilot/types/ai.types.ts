export interface AIAnalysisResult {
    summary: string;
    possibleRootCause: string;
    initialRecommendation: string;
    evidence?: {
        content: string;
        similarity: number;
    }[];
}

export interface WarRoomAIAnalysisProps {
  incidentId: string;
}

export interface AIIncidentAnalysisProps {
  incidentId: string;
}