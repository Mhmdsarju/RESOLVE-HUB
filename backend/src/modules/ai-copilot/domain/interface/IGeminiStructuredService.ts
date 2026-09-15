import { IAIAnalysisResult } from "./IAIAnalysisResult";

export interface IGeminiStructuredService {
    generateStructuredResponse(prompt: string): Promise<IAIAnalysisResult>;
}