import cuid from "cuid";
import { Request, Response, NextFunction } from "express";

import { BaseController } from "@/shared/base/controllers/BaseController";
import { ResponseHandler } from "@/shared/response/response-handler";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";

import { IAnalyzeIncidentUseCase } from "../../domain/interface/IAnalyzeIncidentUseCase";
import { IGetAIAnalysisUseCase } from "../../domain/interface/IGetAIAnalysisUseCase";
import { IIngestKnowledgeDocumentUseCase } from "../../domain/interface/IIngestKnowledgeDocumentUseCase";
import { KnowledgeSourceType } from "../../domain/enums/KnowledgeSourceType";
import { ISearchKnowledgeUseCase } from "../../domain/interface/ISearchKnowledgeUseCase";
import { IGenerateRAGIncidentAnalysisUseCase } from "../../domain/interface/IGenerateRAGIncidentAnalysisUseCase";

export class AIController extends BaseController {
    constructor(
        private readonly analyzeIncidentUseCase: IAnalyzeIncidentUseCase,
        private readonly getAIAnalysisUseCase: IGetAIAnalysisUseCase,
        private readonly ingestKnowledgeDocumentUseCase: IIngestKnowledgeDocumentUseCase,
        private readonly searchKnowledgeUseCase: ISearchKnowledgeUseCase,
        private readonly generateRAGIncidentAnalysisUseCase: IGenerateRAGIncidentAnalysisUseCase
    ) {
        super();
    }

    async analyzeIncident(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);
            const incidentId = req.body.incidentId;

            if (!incidentId || typeof incidentId !== "string") {
                throw new AppError("Incident ID is required", HttpStatusCode.BAD_REQUEST);
            }

            const result = await this.analyzeIncidentUseCase.execute(
                incidentId,
                currentUser.organizationId!
            );

            return ResponseHandler.success(
                res,
                "AI analysis generated successfully",
                result
            );
        } catch (error) {
            next(error);
        }
    }

    async getAIAnalysis(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);
            const incidentId = req.params.incidentId;

            if (!incidentId || typeof incidentId !== "string") {
                throw new AppError("Incident ID is required", HttpStatusCode.BAD_REQUEST);
            }

            const result = await this.getAIAnalysisUseCase.execute(
                incidentId,
                currentUser.organizationId!
            );

            return ResponseHandler.success(
                res,
                "AI analysis fetched successfully",
                result
            );
        } catch (error) {
            next(error);
        }
    }


    async ingestKnowledgeDocument(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);

            const { title, sourceType, sourceId, content, } = req.body;

            if (!title || typeof title !== "string") {
                throw new AppError("Title is required", HttpStatusCode.BAD_REQUEST);
            }

            if (!sourceType || typeof sourceType !== "string") {
                throw new AppError("Source type is required", HttpStatusCode.BAD_REQUEST);
            }

            if (!content || typeof content !== "string") {
                throw new AppError("Content is required", HttpStatusCode.BAD_REQUEST);
            }
            await this.ingestKnowledgeDocumentUseCase.execute({
                id: cuid(),
                organizationId: currentUser.organizationId!,
                title,
                sourceType: sourceType as KnowledgeSourceType,
                sourceId,
                content,
            });
            return ResponseHandler.success(
                res,
                "Knowledge document ingested successfully",
                null
            );
        } catch (error) {
            next(error);
        }
    }

    async searchKnowledge(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);

            const { query, limit, similarityThreshold, } = req.body;

            if (!query || typeof query !== "string") {
                throw new AppError("Query is required", HttpStatusCode.BAD_REQUEST);
            }

            const result = await this.searchKnowledgeUseCase.execute({
                organizationId: currentUser.organizationId!,
                query,
                limit,
                similarityThreshold,
            });

            return ResponseHandler.success(
                res,
                "Knowledge search completed successfully",
                result
            );
        } catch (error) {
            next(error);
        }
    }

    async generateRAGIncidentAnalysis(req: Request, res: Response, next: NextFunction) {
        try {
            const currentUser = this.getCurrentUser(req);
            const incidentId = req.params.incidentId;

            if (!incidentId || typeof incidentId !== "string") {
                throw new AppError("Incident ID is required", HttpStatusCode.BAD_REQUEST);
            }

            const result = await this.generateRAGIncidentAnalysisUseCase.execute(
                incidentId,
                currentUser.organizationId!
            );

            return ResponseHandler.success(
                res,
                "RAG incident analysis generated successfully",
                result
            );
        } catch (error) {
            next(error);
        }
    }



}