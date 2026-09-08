import { GoogleGenAI } from "@google/genai";

import { IGeminiEmbeddingService } from "../../domain/interface/IGeminiEmbeddingService";

export class GeminiEmbeddingService implements IGeminiEmbeddingService {
    private readonly client: GoogleGenAI;

    constructor() {
        this.client = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });
    }

    async generateEmbedding(text: string): Promise<number[]> {
        const response = await this.client.models.embedContent({
            model: "gemini-embedding-2",
            contents: text,
            config: {
                // Use 768 dimensions to balance embedding quality, storage, and vector search performance
                outputDimensionality: 768,
            },
        });

        return response.embeddings?.[0]?.values ?? [];
    }
}