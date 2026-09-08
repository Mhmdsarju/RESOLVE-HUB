import { IncidentCopilotState } from "../state/IncidentCopilotState";
import { IGenerateRCANode } from "@/modules/ai-copilot/domain/interface/langgraph/node/IGenerateRCANode";
import { IGeminiStructuredService } from "@/modules/ai-copilot/domain/interface/IGeminiStructuredService";
import { IRAGPromptBuilder } from "@/modules/ai-copilot/domain/interface/IRAGPromptBuilder";
import { IKnowledgeContextBuilder } from "@/modules/ai-copilot/domain/interface/IKnowledgeContextBuilder";

export class GenerateRCANode implements IGenerateRCANode {

    constructor(
        private readonly aiService: IGeminiStructuredService,
        private readonly ragPromptBuilder: IRAGPromptBuilder,
        private readonly knowledgeContextBuilder: IKnowledgeContextBuilder
    ) { }

    async execute(state: typeof IncidentCopilotState.State) {

        const context = this.knowledgeContextBuilder.build(
            state.evidence
        );

        const prompt = await this.ragPromptBuilder.build(
            state.incident,
            context
        );

        const result = await this.aiService.generateStructuredResponse(
            prompt
        );

        return {
            summary: result.summary,
            rootCause: result.possibleRootCause,
        };
    }

}