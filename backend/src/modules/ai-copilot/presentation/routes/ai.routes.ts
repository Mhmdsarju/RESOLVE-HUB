import { Router } from "express";

import { authMiddleware } from "@/app/middlewares/authMiddleware";
import { organizationAccessMiddleware } from "@/app/middlewares/organization-access.middleware";
import { AIController } from "../controller/AIController";

export function createAIRoutes(aiController: AIController) {
    const router = Router();
    router.post("/analyze",authMiddleware,organizationAccessMiddleware, aiController.analyzeIncident.bind(aiController));
    router.get("/analysis/:incidentId",authMiddleware,organizationAccessMiddleware, aiController.getAIAnalysis.bind(aiController));
    router.post("/knowledge/ingest", authMiddleware,organizationAccessMiddleware,aiController.ingestKnowledgeDocument.bind(aiController));
    router.post("/knowledge/search",authMiddleware,organizationAccessMiddleware, aiController.searchKnowledge.bind(aiController));
    router.post("/incidents/:incidentId/rag-analysis", authMiddleware,organizationAccessMiddleware,aiController.generateRAGIncidentAnalysis.bind(aiController));

    return router;
}