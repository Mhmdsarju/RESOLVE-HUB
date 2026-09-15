import { CreateKnowledgeDocumentDTO } from "../../application/dto/CreateKnowledgeDocumentDTO";

export interface IKnowledgeDocumentRepository {
    create(data: CreateKnowledgeDocumentDTO): Promise<void>;
}