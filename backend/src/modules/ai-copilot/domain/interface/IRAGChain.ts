import { BuildRAGPromptDTO } from "../../application/dto/BuildRAGPromptDTO";
import { IAIAnalysisResult } from "./IAIAnalysisResult";

export interface IRAGChain {
    execute(
        data: BuildRAGPromptDTO,
        organizationId: string
    ): Promise<IAIAnalysisResult>;
}