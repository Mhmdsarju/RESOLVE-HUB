import { KnowledgeSourceType } from "../../domain/enums/KnowledgeSourceType";

export interface IngestKnowledgeDocumentDTO {
    id: string;
    organizationId: string;
    title: string;
    sourceType: KnowledgeSourceType;
    sourceId?: string;
    content: string;
}