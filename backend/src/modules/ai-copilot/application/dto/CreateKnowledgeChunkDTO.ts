export interface CreateKnowledgeChunkDTO {
    id: string;
    documentId: string;
    organizationId: string;
    chunkIndex: number;
    content: string;
    metadata?: Record<string, unknown>;
    embedding: number[];
}