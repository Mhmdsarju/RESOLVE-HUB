import { BuildRAGPromptDTO } from "../../application/dto/BuildRAGPromptDTO";

export interface IRAGPromptBuilder {
    build(
        data: BuildRAGPromptDTO,
        context: string
    ): Promise<string>;
}