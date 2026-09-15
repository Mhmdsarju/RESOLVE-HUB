export interface IGeminiEmbeddingService {
    generateEmbedding(text: string): Promise<number[]>;
}