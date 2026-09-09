import { BrainCircuit, CheckCircle2, FileSearch, Loader2 } from "lucide-react";

import { useAIIncidentAnalysis } from "../hooks/useAIIncidentAnalysis";
import { useLatestAIIncidentAnalysis } from "../hooks/useLatestAIIncidentAnalysis";
import type { AIIncidentAnalysisProps } from "../types/ai.types";



export default function AIIncidentAnalysis({ incidentId }: AIIncidentAnalysisProps) {
  const { mutate: analyzeIncident, data: generatedData, isPending } = useAIIncidentAnalysis();
  const { data: savedData, isLoading } = useLatestAIIncidentAnalysis(incidentId);

  const data = generatedData ?? savedData;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0E7D5]">
            <BrainCircuit size={19} className="text-[#4B3932]" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#4B3932]">AI Incident Analysis</h2>

            <p className="text-xs text-stone-400">
              Analyze this incident using AI and incident knowledge
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => analyzeIncident(incidentId)}
          disabled={isPending}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-[#4B3932]
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:shadow-md
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {isPending ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <BrainCircuit size={16} />
              Analyze with AI
            </>
          )}
        </button>
      </div>

      {isLoading && !generatedData && (
        <div className="mt-6 rounded-xl border border-[#E7DDD3] bg-[#FAF6F0] p-5">
          <p className="text-sm text-stone-400">Loading previous AI analysis...</p>
        </div>
      )}

      {data && (
        <div className="mt-6 space-y-5">
          <div className="rounded-xl border border-[#E7DDD3] bg-[#FAF6F0] p-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-[#4B3932]" />

              <h3 className="text-sm font-semibold text-[#4B3932]">Summary</h3>
            </div>

            <p className="mt-3 text-sm leading-7 text-stone-600">{data.summary}</p>
          </div>

          <div className="rounded-xl border border-[#E7DDD3] bg-[#FAF6F0] p-5">
            <h3 className="text-sm font-semibold text-[#4B3932]">Possible Root Cause</h3>

            <p className="mt-3 text-sm leading-7 text-stone-600">{data.possibleRootCause}</p>
          </div>

          <div className="rounded-xl border border-[#E7DDD3] bg-[#FAF6F0] p-5">
            <h3 className="text-sm font-semibold text-[#4B3932]">Initial Recommendation</h3>

            <p className="mt-3 text-sm leading-7 text-stone-600">{data.initialRecommendation}</p>
          </div>

          {data.evidence && data.evidence.length > 0 && (
            <div className="rounded-xl border border-[#E7DDD3] bg-[#FAF6F0] p-5">
              <div className="flex items-center gap-2">
                <FileSearch size={17} className="text-[#4B3932]" />

                <h3 className="text-sm font-semibold text-[#4B3932]">Evidence</h3>
              </div>

              <div className="mt-4 space-y-3">
                {data.evidence.slice(0,1).map((item, index) => (
                  <div key={`${index}-${item.similarity}`} className="rounded-xl bg-white p-4">
                    <p className="text-sm leading-6 text-stone-600">{item.content}</p>

                    <p className="mt-2 text-xs font-medium text-stone-400">
                      Similarity: {(item.similarity * 100).toFixed(1)}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}