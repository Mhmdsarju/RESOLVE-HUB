import { Router } from "express";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";
import { AIController } from "../controller/AIController";

export function createAIRoutes(aiController: AIController) {
    const router = Router();

    router.use(authMiddleware);
    router.use(organizationAccessMiddleware);

    router.post("/analyze", aiController.analyzeIncident.bind(aiController));
    router.get("/analysis/:incidentId", aiController.getAIAnalysis.bind(aiController));
    router.post("/knowledge/ingest", aiController.ingestKnowledgeDocument.bind(aiController));
    router.post("/knowledge/search", aiController.searchKnowledge.bind(aiController));
    router.post("/incidents/:incidentId/rag-analysis", aiController.generateRAGIncidentAnalysis.bind(aiController));

    return router;
}