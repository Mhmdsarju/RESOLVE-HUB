// Defines the shared LangGraph state used to pass incident data, 
// RAG evidence, AI analysis, and workflow information between nodes.
//Zod is used to define and validate the data types and structure of the LangGraph state.
import { StateSchema } from "@langchain/langgraph";
import { z } from "zod";

import { KnowledgeChunkSearchResultDTO } from "../../../application/dto/KnowledgeChunkSearchResultDTO";

export const IncidentCopilotState = new StateSchema({
    incidentId: z.string(),
    organizationId: z.string(),

    incident: z.object({
        title: z.string(),
        description: z.string().nullable(),
        severity: z.string(),
        priority: z.string(),
        status: z.string(),
        type: z.string(),
    }),

    retrievedDocuments: z.array(
        z.custom<KnowledgeChunkSearchResultDTO>()
    ).default([]),

    evidence: z.array(
        z.custom<KnowledgeChunkSearchResultDTO>()
    ).default([]),

    summary: z.string().nullable().default(null),

    rootCause: z.string().nullable().default(null),

    recommendation: z.string().nullable().default(null),

    retryCount: z.number().default(0),
});