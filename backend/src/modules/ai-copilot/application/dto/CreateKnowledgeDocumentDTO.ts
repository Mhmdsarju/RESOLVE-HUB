import { KnowledgeSourceType } from "../../domain/enums/KnowledgeSourceType";

export interface CreateKnowledgeDocumentDTO {
    id: string;
    organizationId: string;
    title: string;
    sourceType: KnowledgeSourceType;
    sourceId?: string;
    content?: string;
}