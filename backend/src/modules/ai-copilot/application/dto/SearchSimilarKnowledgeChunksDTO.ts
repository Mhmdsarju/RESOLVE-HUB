export interface SearchSimilarKnowledgeChunksDTO {
    organizationId: string;
    embedding: number[];
    limit: number;
    similarityThreshold?: number;
}