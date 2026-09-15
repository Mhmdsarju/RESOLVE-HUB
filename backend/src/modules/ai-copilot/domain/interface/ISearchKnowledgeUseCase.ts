import { SearchKnowledgeDTO } from "../../application/dto/SearchKnowledgeDTO";
import { KnowledgeChunkSearchResultDTO } from "../../application/dto/KnowledgeChunkSearchResultDTO";

export interface ISearchKnowledgeUseCase {
    execute(data: SearchKnowledgeDTO): Promise<KnowledgeChunkSearchResultDTO[]>;
}