export interface KnowledgeChunkSearchResultDTO {
    id: string;
    documentId: string;
    content: string;
    metadata: Record<string, unknown> | null;
    similarity: number;
}