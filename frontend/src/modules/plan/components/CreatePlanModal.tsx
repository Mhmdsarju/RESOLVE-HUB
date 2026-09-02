import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreditCard, X } from "lucide-react";

import { useCreatePlan } from "../hooks/useCreatePlan";
import { createPlanSchema } from "../schemas/plan.schema";

type CreatePlanFormData = z.input<typeof createPlanSchema>;
type CreatePlanSubmitData = z.output<typeof createPlanSchema>;

interface CreatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePlanModal({ isOpen, onClose }: CreatePlanModalProps) {
  const createMutation = useCreatePlan();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePlanFormData, unknown, CreatePlanSubmitData>({
    resolver: zodResolver(createPlanSchema),
    defaultValues: {
      name: "FREE",
      price: 0,
      durationDays: null,
      maxProjects: null,
      isActive: true,
    },
  });

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    if (createMutation.isPending) {
      return;
    }

    reset();
    onClose();
  };

  const onSubmit = (data: CreatePlanSubmitData) => {
    createMutation.mutate(
      {
        name: data.name,
        price: data.price,
        durationDays: data.durationDays,
        maxProjects: data.maxProjects,
        isActive: data.isActive,
      },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      },
    );
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        px-4
        py-8
        backdrop-blur-[2px]
      "
    >
      <div
        className="
          w-full
          max-w-lg
          rounded-3xl
          bg-white
          p-6
          shadow-2xl
          transition-all
          duration-300
        "
      >
        <div className="flex items-start justify-between">
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
              <h2 className="text-lg font-bold text-[#4B3932]">Create Plan</h2>

              <p className="mt-1 text-xs text-stone-400">
                Create a subscription plan for your organization.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={createMutation.isPending}
            className="
              rounded-lg
              p-2
              text-stone-400
              transition-all
              duration-200
              hover:bg-[#FAF6F0]
              hover:text-[#4B3932]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5">
          <div>
            <label
              htmlFor="plan-name"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-[#4B3932]
              "
            >
              Plan Name
            </label>

            <select
              id="plan-name"
              {...register("name")}
              disabled={createMutation.isPending}
              className="
                w-full
                rounded-xl
                border
                border-[#E7DDD3]
                bg-white
                px-4
                py-3
                text-sm
                text-[#4B3932]
                outline-none
                transition-all
                duration-200
                hover:border-[#D8C9BD]
                focus:border-[#4B3932]
                focus:ring-2
                focus:ring-[#4B3932]/10
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <option value="FREE">Free</option>
              <option value="PREMIUM">Premium</option>
            </select>

            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label
              htmlFor="plan-price"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-[#4B3932]
              "
            >
              Price
            </label>

            <input
              id="plan-price"
              type="number"
              min="0"
              step="0.01"
              {...register("price")}
              disabled={createMutation.isPending}
              placeholder="999"
              className="
                w-full
                rounded-xl
                border
                border-[#E7DDD3]
                bg-white
                px-4
                py-3
                text-sm
                text-[#4B3932]
                outline-none
                transition-all
                duration-200
                placeholder:text-stone-300
                hover:border-[#D8C9BD]
                focus:border-[#4B3932]
                focus:ring-2
                focus:ring-[#4B3932]/10
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />

            {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>}
          </div>

          <div>
            <label
              htmlFor="plan-duration"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-[#4B3932]
              "
            >
              Duration
              <span className="ml-1 font-normal text-stone-400">Optional</span>
            </label>

            <input
              id="plan-duration"
              type="number"
              min="1"
              {...register("durationDays", {
                setValueAs: (value) => (value === "" ? null : Number(value)),
              })}
              disabled={createMutation.isPending}
              placeholder="30"
              className="
                w-full
                rounded-xl
                border
                border-[#E7DDD3]
                bg-white
                px-4
                py-3
                text-sm
                text-[#4B3932]
                outline-none
                transition-all
                duration-200
                placeholder:text-stone-300
                hover:border-[#D8C9BD]
                focus:border-[#4B3932]
                focus:ring-2
                focus:ring-[#4B3932]/10
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />

            {errors.durationDays && (
              <p className="mt-1 text-xs text-red-500">{errors.durationDays.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="plan-max-projects"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-[#4B3932]
              "
            >
              Maximum Projects
              <span className="ml-1 font-normal text-stone-400">Optional</span>
            </label>

            <input
              id="plan-max-projects"
              type="number"
              min="1"
              {...register("maxProjects", {
                setValueAs: (value) => (value === "" ? null : Number(value)),
              })}
              disabled={createMutation.isPending}
              placeholder="10"
              className="
                w-full
                rounded-xl
                border
                border-[#E7DDD3]
                bg-white
                px-4
                py-3
                text-sm
                text-[#4B3932]
                outline-none
                transition-all
                duration-200
                placeholder:text-stone-300
                hover:border-[#D8C9BD]
                focus:border-[#4B3932]
                focus:ring-2
                focus:ring-[#4B3932]/10
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />

            {errors.maxProjects && (
              <p className="mt-1 text-xs text-red-500">{errors.maxProjects.message}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <input
              id="plan-active"
              type="checkbox"
              {...register("isActive")}
              disabled={createMutation.isPending}
              className="
                h-4
                w-4
                rounded
                border-[#E7DDD3]
                text-[#4B3932]
                focus:ring-[#4B3932]/20
              "
            />

            <label htmlFor="plan-active" className="text-sm font-medium text-[#4B3932]">
              Active Plan
            </label>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-[#E7DDD3]
              bg-[#FAF6F0]
              p-4
            "
          >
            <p className="text-xs leading-5 text-stone-500">
              Configure the pricing, duration, and project limit for this subscription plan.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={createMutation.isPending}
              className="
                rounded-xl
                border
                border-[#E7DDD3]
                px-5
                py-2.5
                text-sm
                font-medium
                text-[#4B3932]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#FAF6F0]
                hover:shadow-sm
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createMutation.isPending}
              className="
                rounded-xl
                bg-[#4B3932]
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#3B2E29]
                hover:shadow-lg
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {createMutation.isPending ? "Creating..." : "Create Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
