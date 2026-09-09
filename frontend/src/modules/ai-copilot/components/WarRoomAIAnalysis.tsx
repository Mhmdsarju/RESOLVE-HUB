import { BrainCircuit, CheckCircle2, FileSearch, Loader2, X } from "lucide-react";
import { useState } from "react";

import { useLatestAIIncidentAnalysis } from "../hooks/useLatestAIIncidentAnalysis";
import type { WarRoomAIAnalysisProps } from "../types/ai.types";



export default function WarRoomAIAnalysis({ incidentId }: WarRoomAIAnalysisProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useLatestAIIncidentAnalysis(incidentId);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          bg-[#4B3932]
          px-4
          py-3
          text-sm
          font-semibold
          text-white
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:shadow-md
        "
      >
        <BrainCircuit size={16} />
        Analyze with AI
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E7DDD3] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0E7D5]">
                  <BrainCircuit size={18} className="text-[#4B3932]" />
                </div>

                <div>
                  <h2 className="text-base font-bold text-[#4B3932]">AI Incident Analysis</h2>

                  <p className="text-xs text-stone-400">Latest saved analysis for this incident</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 text-stone-400 transition-colors hover:bg-[#FAF6F0] hover:text-[#4B3932]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[calc(85vh-80px)] overflow-y-auto p-6">
              {isLoading && (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center gap-2 text-sm text-stone-400">
                    <Loader2 size={17} className="animate-spin" />
                    Loading AI analysis...
                  </div>
                </div>
              )}

              {!isLoading && !data && (
                <div className="rounded-xl border border-[#E7DDD3] bg-[#FAF6F0] p-5 text-center">
                  <BrainCircuit size={24} className="mx-auto text-stone-400" />

                  <p className="mt-3 text-sm font-semibold text-[#4B3932]">
                    No AI analysis available
                  </p>

                  <p className="mt-1 text-xs leading-5 text-stone-400">
                    Generate an AI analysis from the incident details first.
                  </p>
                </div>
              )}

              {data && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-[#E7DDD3] bg-[#FAF6F0] p-5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={17} className="text-[#4B3932]" />

                      <h3 className="text-sm font-semibold text-[#4B3932]">Summary</h3>
                    </div>

                    <p className="mt-3 text-sm leading-7 text-stone-600">{data.summary}</p>
                  </div>

                  <div className="rounded-xl border border-[#E7DDD3] bg-[#FAF6F0] p-5">
                    <h3 className="text-sm font-semibold text-[#4B3932]">Possible Root Cause</h3>

                    <p className="mt-3 text-sm leading-7 text-stone-600">
                      {data.possibleRootCause}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#E7DDD3] bg-[#FAF6F0] p-5">
                    <h3 className="text-sm font-semibold text-[#4B3932]">Initial Recommendation</h3>

                    <p className="mt-3 text-sm leading-7 text-stone-600">
                      {data.initialRecommendation}
                    </p>
                  </div>

                  {data.evidence && data.evidence.length > 0 && (
                    <div className="rounded-xl border border-[#E7DDD3] bg-[#FAF6F0] p-5">
                      <div className="flex items-center gap-2">
                        <FileSearch size={17} className="text-[#4B3932]" />

                        <h3 className="text-sm font-semibold text-[#4B3932]">Evidence</h3>
                      </div>

                      <div className="mt-4 space-y-3">
                        {data.evidence.slice(0,1).map((item, index) => (
                          <div
                            key={`${index}-${item.similarity}`}
                            className="rounded-xl bg-white p-4"
                          >
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
          </div>
        </div>
      )}
    </>
  );
}
