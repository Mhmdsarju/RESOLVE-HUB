export interface SearchKnowledgeDTO {
    organizationId: string;
    query: string;
    limit?: number;
    similarityThreshold?: number;
}