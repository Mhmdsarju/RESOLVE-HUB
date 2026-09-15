import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { generateAIIncidentAnalysis } from "../api/ai.api";

import type { AIAnalysisResult } from "../types/ai.types";
import type { ErrorResponse } from "@/core/types/error.types";


export function useAIIncidentAnalysis() {

  return useMutation<AIAnalysisResult, AxiosError<ErrorResponse>, string>({
    mutationFn: (incidentId) => generateAIIncidentAnalysis(incidentId),

    onError: (error) => {
      const message = error.response?.data?.message ?? "Failed to analyze incident";
      toast.error(message);
    },
  });
}