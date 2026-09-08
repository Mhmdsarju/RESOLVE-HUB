import { z } from "zod";

export const AIAnalysisResultSchema = z.object({
    summary: z.string(),
    possibleRootCause: z.string(),
    initialRecommendation: z.string(),
});