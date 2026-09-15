import { CreditCard, Edit, FolderKanban, CalendarDays } from "lucide-react";

import type { PlanListProps } from "../types/plan.types";

export default function PlanList({ plans, isLoading, isError, onEditPlan }: PlanListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-5 md:grid-cols-2">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="
              h-72
              animate-pulse
              rounded-2xl
              border
              border-stone-200
              bg-white
              shadow-sm
            "
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-red-200
          bg-red-50
          p-6
          text-center
        "
      >
        <p className="text-sm font-medium text-red-600">Failed to load plans.</p>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-dashed
          border-stone-300
          bg-white
          p-10
          text-center
        "
      >
        <div
          className="
            mx-auto
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-[#F0E7D5]
            text-[#4B3932]
          "
        >
          <CreditCard size={25} />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-[#4B3932]">No plans found</h3>

        <p className="mt-1 text-sm text-stone-500">
          Create your first subscription plan to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className="
            rounded-2xl
            border
            border-stone-200
            bg-white
            p-6
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#F0E7D5]
                  text-[#4B3932]
                "
              >
                <CreditCard size={21} />
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#4B3932]">{plan.name}</h3>

                <p className="text-xs text-stone-500">Subscription Plan</p>
              </div>
            </div>

            <span
              className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                ${plan.isActive ? "bg-green-100 text-green-700" : "bg-stone-100 text-stone-500"}
              `}
            >
              {plan.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="mt-6">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-[#4B3932]">₹{plan.price}</span>

              {plan.durationDays && (
                <span className="mb-1 text-sm text-stone-500">/ {plan.durationDays} days</span>
              )}
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div
              className="
                flex
                items-center
                gap-3
                rounded-xl
                bg-[#FAF7F1]
                p-3
              "
            >
              <CalendarDays size={18} className="text-[#4B3932]" />

              <div>
                <p className="text-xs text-stone-500">Duration</p>

                <p className="text-sm font-semibold text-[#4B3932]">
                  {plan.durationDays ? `${plan.durationDays} days` : "Unlimited"}
                </p>
              </div>
            </div>

            <div
              className="
                flex
                items-center
                gap-3
                rounded-xl
                bg-[#FAF7F1]
                p-3
              "
            >
              <FolderKanban size={18} className="text-[#4B3932]" />

              <div>
                <p className="text-xs text-stone-500">Max Projects</p>

                <p className="text-sm font-semibold text-[#4B3932]">
                  {plan.maxProjects ? plan.maxProjects : "Unlimited"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-stone-100 pt-4">
            <button
              type="button"
              onClick={() => onEditPlan(plan)}
              className="
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-[#4B3932]
                px-4
                py-2.5
                text-sm
                font-semibold
                text-[#4B3932]
                transition-all
                duration-300
                hover:bg-[#4B3932]
                hover:text-white
              "
            >
              <Edit size={16} />
              Edit Plan
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
