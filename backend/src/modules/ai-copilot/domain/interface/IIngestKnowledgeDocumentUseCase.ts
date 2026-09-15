import { IngestKnowledgeDocumentDTO } from "../../application/dto/IngestKnowledgeDocumentDTO";

export interface IIngestKnowledgeDocumentUseCase {
    execute(document: IngestKnowledgeDocumentDTO): Promise<void>;
}