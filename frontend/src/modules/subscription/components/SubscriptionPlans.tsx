import { useState } from "react";
import { Check, CreditCard, Crown } from "lucide-react";

import type { Plan } from "@/modules/plan/types/plan.types";

interface SubscriptionPlansProps {
  plans: Plan[];
  currentPlanId: string;
  isExpired: boolean;
  onUpgrade: (plan: Plan) => void;
}

export default function SubscriptionPlans({
  plans,
  currentPlanId,
  isExpired,
  onUpgrade,
}: SubscriptionPlansProps) {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const activePlans = plans.filter((plan) => plan.isActive);

  const currentPlan = plans.find((plan) => plan.id === currentPlanId);

  const handleUpgradeClick = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handleConfirm = () => {
    if (!selectedPlan) {
      return;
    }

    onUpgrade(selectedPlan);
    setSelectedPlan(null);
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-[#4B3932]">Available Plans</h2>

        <p className="mt-1 text-sm text-stone-500">
          Choose a plan that works for your organization.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {activePlans.map((plan) => {
          const isCurrentPlan = plan.id === currentPlanId;
          const isFreePlanUnavailable =
            plan.name === "FREE" && currentPlan?.name !== "FREE";

          return (
            <div
              key={plan.id}
              className={`relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm transition-all ${
                isCurrentPlan
                  ? "border-[#4B3932] ring-1 ring-[#4B3932]"
                  : "border-stone-200 hover:-translate-y-1 hover:shadow-md"
              }`}
            >
              {isCurrentPlan && (
                <span className="absolute right-5 top-5 rounded-full bg-[#4B3932] px-3 py-1 text-xs font-semibold text-white">
                  Current Plan
                </span>
              )}

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0E7D5] text-[#4B3932]">
                {plan.name === "PREMIUM" ? <Crown size={22} /> : <CreditCard size={22} />}
              </div>

              <h3 className="mt-5 text-xl font-bold text-[#4B3932]">{plan.name}</h3>

              <div className="mt-3 flex items-end gap-1">
                <span className="text-3xl font-bold text-[#4B3932]">₹{plan.price}</span>

                <span className="pb-1 text-sm text-stone-500">
                  / {plan.durationDays ?? "Unlimited"} days
                </span>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-stone-600">
                  <Check size={17} className="text-green-600" />

                  <span>
                    {plan.maxProjects ? `Up to ${plan.maxProjects} projects` : "Unlimited projects"}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm text-stone-600">
                  <Check size={17} className="text-green-600" />

                  <span>
                    {plan.durationDays ? `${plan.durationDays} days access` : "Unlimited access"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                disabled={isCurrentPlan || isFreePlanUnavailable}
                onClick={() => handleUpgradeClick(plan)}
                className={`mt-7 w-full rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
                  isCurrentPlan || isFreePlanUnavailable
                    ? "cursor-not-allowed bg-stone-100 text-stone-400"
                    : "bg-[#4B3932] text-white hover:bg-[#3B2E29]"
                }`}
              >
                {isCurrentPlan
                  ? "Current Plan"
                  : isFreePlanUnavailable
                    ? "This plan is no longer available"
                    : isExpired
                      ? "Renew Premium"
                      : "Upgrade to Premium"}
              </button>
              {isFreePlanUnavailable && (
                <div className="pointer-events-none absolute left-[-20%] top-[48%] w-[140%] -rotate-[12deg] bg-red-600 py-3 text-center shadow-lg">
                  <span className="text-sm font-black uppercase tracking-[0.2em] text-white">
                    This plan is no longer available
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-[#4B3932]">Confirm Upgrade</h2>

            <p className="mt-2 text-sm leading-6 text-stone-500">
              Are you sure you want to proceed to checkout for the{" "}
              <span className="font-semibold text-[#4B3932]">{selectedPlan.name}</span> plan?
            </p>

            <div className="mt-4 rounded-xl bg-[#F8F4EC] p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-500">Plan</span>

                <span className="text-sm font-semibold text-[#4B3932]">{selectedPlan.name}</span>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-stone-500">Amount</span>

                <span className="text-lg font-bold text-[#4B3932]">₹{selectedPlan.price}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedPlan(null)}
                className="flex-1 rounded-xl border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-600 transition hover:bg-stone-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 rounded-xl bg-[#4B3932] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#3B2E29]"
              >
                Continue to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}