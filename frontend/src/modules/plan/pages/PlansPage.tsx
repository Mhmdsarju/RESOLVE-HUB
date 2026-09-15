import { useState } from "react";
import { CheckCircle2, CreditCard, Crown, Plus } from "lucide-react";

import PlanList from "../components/PlanList";
import CreatePlanModal from "../components/CreatePlanModal";
import UpdatePlanModal from "../components/UpdatePlanModel";

import { usePlans } from "../hooks/usePlans";

import type { Plan } from "../types/plan.types";

export default function PlanPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const { data: plans, isLoading, isError } = usePlans();

  const totalPlans = plans?.length ?? 0;

  const activePlans =
    plans?.filter((plan) => plan.isActive).length ?? 0;

  const premiumPlans =
    plans?.filter((plan) => plan.name === "PREMIUM").length ?? 0;

  const handleEditPlan = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handleCloseUpdateModal = () => {
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen space-y-8 bg-stone-50/50 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#4B3932]/10 bg-[#4B3932]/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#4B3932]">
            <CreditCard size={13} />
            Subscription Management
          </div>

          <h1 className="text-3xl font-black tracking-tight text-[#4B3932]">
            Plans
          </h1>

          <p className="mt-1 text-sm font-medium text-stone-500">
            Create and manage subscription plans for ResolveHub.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#4B3932] px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3B2E29] hover:shadow-lg"
        >
          <Plus size={18} />
          Create Plan
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="relative overflow-hidden rounded-3xl bg-[#4B3932] p-7 text-white shadow-xl">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

          <div className="absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-black/10 blur-3xl" />

          <div className="relative flex h-full flex-col justify-between gap-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
                  Total Plans
                </p>

                <p className="mt-3 max-w-xs text-sm font-medium leading-6 text-white/70">
                  Subscription plans currently configured for the ResolveHub
                  platform.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
            </div>

            <div>
              <p className="text-5xl font-black tracking-tight">
                {totalPlans}
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-white/60">
                <span className="h-2 w-2 rounded-full bg-white/70" />
                Configured subscription plans
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-2">
          <div className="group relative overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-lg">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-stone-50 transition-transform duration-500 group-hover:scale-125" />

            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Active Plans
                </span>

                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-3 text-emerald-600 shadow-sm">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-8">
                <p className="text-4xl font-black tracking-tight text-[#4B3932]">
                  {activePlans}
                </p>

                <p className="mt-2 text-xs font-semibold text-stone-400">
                  Currently available plans
                </p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-lg">
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#F0E7D5]/40 transition-transform duration-500 group-hover:scale-125" />

            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Premium Plans
                </span>

                <div className="rounded-2xl border border-[#F0E7D5] bg-[#F0E7D5]/70 p-3 text-[#4B3932] shadow-sm">
                  <Crown className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-8">
                <p className="text-4xl font-black tracking-tight text-[#4B3932]">
                  {premiumPlans}
                </p>

                <p className="mt-2 text-xs font-semibold text-stone-400">
                  Paid premium subscription plans
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-stone-100 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-black text-[#4B3932]">
              Subscription Plans
            </h2>

            <p className="mt-1 text-sm font-medium text-stone-500">
              View and manage all available ResolveHub plans.
            </p>
          </div>

          <div className="rounded-xl bg-stone-50 px-3 py-2 text-xs font-bold text-stone-500">
            {totalPlans} {totalPlans === 1 ? "Plan" : "Plans"}
          </div>
        </div>

        <div className="p-2 sm:p-4">
          <PlanList
            plans={plans ?? []}
            isLoading={isLoading}
            isError={isError}
            onEditPlan={handleEditPlan}
          />
        </div>
      </div>

      <CreatePlanModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <UpdatePlanModal
        isOpen={selectedPlan !== null}
        plan={selectedPlan}
        onClose={handleCloseUpdateModal}
      />
    </div>
  );
}