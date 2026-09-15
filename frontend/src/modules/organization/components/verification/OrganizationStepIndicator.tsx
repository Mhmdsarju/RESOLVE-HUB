import { Check, Circle } from "lucide-react";

interface OrganizationStepIndicatorProps {
  currentStep: number;
}

const steps = [
  {
    number: 1,
    title: "Basic Information",
    description: "Organization details",
  },
  {
    number: 2,
    title: "Contact & Location",
    description: "Contact information",
  },
  {
    number: 3,
    title: "Review & Submit",
    description: "Verify your details",
  },
];

export default function OrganizationStepIndicator({ currentStep }: OrganizationStepIndicatorProps) {
  return (
    <div className="w-full max-w-280px rounded-3xl border border-[#E7DDD3] bg-white p-5 shadow-[0_12px_35px_rgba(75,57,50,0.08)]">
      <div className="mb-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400">
          Verification Progress
        </p>

        <h2 className="mt-1 text-sm font-bold text-[#4B3932]">Organization Setup</h2>
      </div>

      <div className="relative">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.number}>
              <div
                className={`
                  relative
                  rounded-2xl
                  p-3
                  transition-all
                  duration-300
                  ${isCurrent ? "bg-[#FAF6F0] shadow-sm" : "bg-transparent"}
                `}
              >
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    {isCurrent && (
                      <div className="absolute -inset-1 rounded-xl bg-[#4B3932]/10 blur-sm" />
                    )}

                    <div
                      className={`
                        relative
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        text-xs
                        font-bold
                        transition-all
                        duration-300
                        ${
                          isCompleted
                            ? "bg-[#4B3932] text-white shadow-md shadow-[#4B3932]/20"
                            : isCurrent
                              ? "bg-[#F0E7D5] text-[#4B3932] ring-1 ring-[#4B3932]/20"
                              : "bg-stone-100 text-stone-400"
                        }
                      `}
                    >
                      {isCompleted ? (
                        <Check size={17} strokeWidth={2.5} />
                      ) : isCurrent ? (
                        <span className="h-2.5 w-2.5 rounded-full bg-[#4B3932]" />
                      ) : (
                        <Circle size={16} strokeWidth={1.8} />
                      )}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`
                        text-sm
                        font-bold
                        leading-5
                        ${isCurrent || isCompleted ? "text-[#4B3932]" : "text-stone-400"}
                      `}
                    >
                      {step.title}
                    </p>

                    <p
                      className={`
                        mt-0.5
                        text-[11px]
                        leading-4
                        ${isCurrent ? "text-stone-500" : "text-stone-400"}
                      `}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>

              {!isLast && (
                <div className="relative ml-32px h-10 w-px">
                  <div className="absolute inset-0 bg-[#E7DDD3]" />

                  <div
                    className={`
                      absolute
                      left-0
                      top-0
                      w-px
                      transition-all
                      duration-500
                      ${isCompleted ? "h-full bg-[#4B3932]" : "h-0 bg-[#4B3932]"}
                    `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 border-t border-[#E7DDD3] pt-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
            Step
          </span>

          <span className="text-xs font-bold text-[#4B3932]">
            {currentStep} of {steps.length}
          </span>
        </div>

        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#F0E7D5]">
          <div
            className="h-full rounded-full bg-[#4B3932] transition-all duration-500"
            style={{
              width: `${(currentStep / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
