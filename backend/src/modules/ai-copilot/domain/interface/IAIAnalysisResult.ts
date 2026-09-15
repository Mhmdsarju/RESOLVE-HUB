export interface IAIAnalysisResult {
    summary: string;
    possibleRootCause: string;
    initialRecommendation: string;
    evidence?: {
        content: string;
        similarity: number;
    }[];
}

export function isAIAnalysisResult(value: unknown): value is IAIAnalysisResult {
    if (!value || typeof value !== "object") {
        return false;
    }

    const result = value as Record<string, unknown>;

    return (
        typeof result.summary === "string" &&
        typeof result.possibleRootCause === "string" &&
        typeof result.initialRecommendation === "string"
    );
}