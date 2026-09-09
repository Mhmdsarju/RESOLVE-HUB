import { IAnalyzeIncidentUseCase } from "../../domain/interface/IAnalyzeIncidentUseCase";
import { IGeminiService } from "../../domain/interface/IGeminiService";
import { IGetIncidentByIdUseCase } from "@/modules/incident/domain/interfaces/use-cases/IGetIncidentByIdUseCase";
import { IAIAnalysisResult, isAIAnalysisResult } from "../../domain/interface/IAIAnalysisResult";
import { AppError } from "@/shared/errors/AppError";
import { HttpStatusCode } from "@/shared/constant/HttpStatusCode";
import { IAIIncidentAnalysisRepository } from "../../domain/interface/IAIIncidentAnalysisRepository";

export class AnalyzeIncidentUseCase implements IAnalyzeIncidentUseCase {
  constructor(
    private readonly aiService: IGeminiService,
    private readonly getIncidentByIdUseCase: IGetIncidentByIdUseCase,
    private readonly aiIncidentAnalysisRepository: IAIIncidentAnalysisRepository
  ) { }

  async execute(incidentId: string, organizationId: string): Promise<IAIAnalysisResult> {

    const incident = await this.getIncidentByIdUseCase.execute(
      incidentId,
      organizationId
    );

    const prompt = `
Analyze the following incident:

Title: ${incident.title}
Description: ${incident.description ?? "No description provided"}
Severity: ${incident.severity}
Priority: ${incident.priority}
Status: ${incident.status}
Type: ${incident.type}

Return the analysis as valid JSON using exactly this structure:

{
  "summary": "A short summary of the incident",
  "possibleRootCause": "The most likely possible root cause",
  "initialRecommendation": "The recommended initial action"
}

Rules:
- Return only valid JSON.
- Do not include markdown.
- Do not add any extra fields.
- Base the analysis only on the incident information provided.
- If the information is insufficient to determine a root cause, clearly say that there is insufficient information.
`;

    const response = await this.aiService.generateResponse(prompt);

    let parsedResponse: IAIAnalysisResult;

    try {
      const parsed = JSON.parse(response);

      if (!isAIAnalysisResult(parsed)) {
        throw new AppError("AI returned an invalid response structure", HttpStatusCode.INTERNAL_SERVER_ERROR);
      }

      parsedResponse = parsed;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError("AI returned an invalid response", HttpStatusCode.INTERNAL_SERVER_ERROR);
    }

    await this.aiIncidentAnalysisRepository.create({
      incidentId,
      organizationId,
      summary: parsedResponse.summary,
      possibleRootCause: parsedResponse.possibleRootCause,
      initialRecommendation: parsedResponse.initialRecommendation,
      evidence: [],
      model: "gemini-3.8-flash",
      promptVersion: "v1",
    });

    return parsedResponse;
  }
}