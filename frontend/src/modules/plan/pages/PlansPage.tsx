import { useState } from "react";
import { CreditCard, Plus } from "lucide-react";

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
    <div className="space-y-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-[#F0E7D5]
              text-[#4B3932]
              shadow-sm
            "
          >
            <CreditCard size={23} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#4B3932]">
              Plans
            </h1>

            <p className="mt-1 text-sm text-stone-500">
              Create and manage subscription plans.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#4B3932]
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-[#3B2E29]
            hover:shadow-lg
          "
        >
          <Plus size={18} />
          Create Plan
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div
          className="
            rounded-2xl
            border
            border-stone-200
            bg-white
            p-5
            shadow-sm
          "
        >
          <p className="text-sm font-medium text-stone-500">
            Total Plans
          </p>

          <p className="mt-2 text-2xl font-bold text-[#4B3932]">
            {totalPlans}
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-stone-200
            bg-white
            p-5
            shadow-sm
          "
        >
          <p className="text-sm font-medium text-stone-500">
            Active Plans
          </p>

          <p className="mt-2 text-2xl font-bold text-[#4B3932]">
            {activePlans}
          </p>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-stone-200
            bg-white
            p-5
            shadow-sm
          "
        >
          <p className="text-sm font-medium text-stone-500">
            Premium Plans
          </p>

          <p className="mt-2 text-2xl font-bold text-[#4B3932]">
            {premiumPlans}
          </p>
        </div>
      </div>

      <PlanList
        plans={plans ?? []}
        isLoading={isLoading}
        isError={isError}
        onEditPlan={handleEditPlan}
      />

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