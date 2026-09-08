import { StateGraph, START, END } from "@langchain/langgraph";

import { IncidentCopilotState } from "./state/IncidentCopilotState";
import { AnalyzeIncidentNode } from "./nodes/AnalyzeIncidentNode";
import { RetrieveKnowledgeNode } from "./nodes/RetrieveKnowledgeNode";
import { EvaluateEvidenceNode } from "./nodes/EvaluateEvidenceNode";
import { GenerateRCANode } from "./nodes/GenerateRCANode";
import { ValidateNode } from "./nodes/ValidateNode";
import { evaluateEvidence } from "./edges/EvidenceDecision";
import { IKnowledgeRetrieverFactory } from "@/modules/ai-copilot/domain/interface/IKnowledgeRetrieverFactory";
import { GenerateResolutionNode } from "./nodes/GenerateResolutionNode";
import { RetrieveMoreKnowledgeNode } from "./nodes/RetrieveMoreKnowledgeNode";
import { IGetIncidentByIdUseCase } from "@/modules/incident/domain/interfaces/use-cases/IGetIncidentByIdUseCase";
import { IGeminiStructuredService } from "@/modules/ai-copilot/domain/interface/IGeminiStructuredService";
import { IRAGPromptBuilder } from "@/modules/ai-copilot/domain/interface/IRAGPromptBuilder";
import { IKnowledgeContextBuilder } from "@/modules/ai-copilot/domain/interface/IKnowledgeContextBuilder";

export function createIncidentCopilotGraph(
    knowledgeRetrieverFactory: IKnowledgeRetrieverFactory,
    getIncidentByIdUseCase: IGetIncidentByIdUseCase,
    aiService: IGeminiStructuredService,
    ragPromptBuilder: IRAGPromptBuilder,
    knowledgeContextBuilder: IKnowledgeContextBuilder
) {

    const analyzeIncidentNode = new AnalyzeIncidentNode(getIncidentByIdUseCase);

    const retrieveKnowledgeNode = new RetrieveKnowledgeNode(
        knowledgeRetrieverFactory
    );

    const retrieveMoreKnowledgeNode = new RetrieveMoreKnowledgeNode(
        knowledgeRetrieverFactory
    );

    const evaluateEvidenceNode = new EvaluateEvidenceNode();

    const generateRCANode = new GenerateRCANode(
        aiService,
        ragPromptBuilder,
        knowledgeContextBuilder
    );
    
    const generateResolutionNode = new GenerateResolutionNode(
    aiService,
    ragPromptBuilder,
    knowledgeContextBuilder
);

    const validateNode = new ValidateNode();

    const graph = new StateGraph(IncidentCopilotState)

        // .addNode() → Add a node to the graph
        .addNode(
            "analyzeIncident",
            (state) => analyzeIncidentNode.execute(state)
        ).addNode(
            "retrieveKnowledge",
            (state) => retrieveKnowledgeNode.execute(state)
        ).addNode(
            "evaluateEvidence",
            (state) => evaluateEvidenceNode.execute(state)
        ).addNode(
            "retrieveMoreKnowledge",
            (state) => retrieveMoreKnowledgeNode.execute(state)
        ).addNode(
            "generateRCA",
            (state) => generateRCANode.execute(state)
        ).addNode(
            "generateResolution",
            (state) => generateResolutionNode.execute(state)
        ).addNode(
            "validate",
            (state) => validateNode.execute(state)
        )

        // .addEdge() → Connect START to Analyze Incident node
        .addEdge(START, "analyzeIncident")

        // .addEdge() → Connect Analyze Incident to Retrieve Knowledge
        .addEdge("analyzeIncident", "retrieveKnowledge")

        // .addEdge() → Connect Retrieve Knowledge to Evaluate Evidence
        .addEdge("retrieveKnowledge", "evaluateEvidence")

        // .addConditionalEdges() → Route based on evidence evaluation
        .addConditionalEdges("evaluateEvidence", evaluateEvidence,
            {
                enoughEvidence: "generateRCA",
                retrieveMoreKnowledge: "retrieveMoreKnowledge",
                insufficientEvidence: END,
            }
        )

        // .addEdge() → Connect Retrieve More Knowledge back to Evaluate Evidence
        .addEdge("retrieveMoreKnowledge", "evaluateEvidence")

        // .addEdge() → Connect Generate RCA to Generate Resolution
        .addEdge("generateRCA", "generateResolution")

        // .addEdge() → Connect Generate Resolution to Validate
        .addEdge("generateResolution", "validate")

        // .addEdge() → Connect Validate to END
        .addEdge("validate", END)

        // .compile() → Compile the graph before execution
        .compile();

    return graph;
}