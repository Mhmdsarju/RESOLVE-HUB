import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreditCard, X } from "lucide-react";

import { useUpdatePlan } from "../hooks/useUpdatePlan";
import { updatePlanSchema } from "../schemas/plan.schema";

import type { Plan } from "../types/plan.types";

type UpdatePlanFormData = z.input<typeof updatePlanSchema>;
type UpdatePlanSubmitData = z.output<typeof updatePlanSchema>;

interface UpdatePlanModalProps {
  isOpen: boolean;
  plan: Plan | null;
  onClose: () => void;
}

export default function UpdatePlanModal({
  isOpen,
  plan,
  onClose,
}: UpdatePlanModalProps) {
  const updateMutation = useUpdatePlan();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePlanFormData, unknown, UpdatePlanSubmitData>({
    resolver: zodResolver(updatePlanSchema),
    defaultValues: {
      name: "FREE",
      price: 0,
      durationDays: null,
      maxProjects: null,
      isActive: true,
    },
  });

  useEffect(() => {
    if (plan && isOpen) {
      reset({
        name: plan.name,
        price: plan.price,
        durationDays: plan.durationDays,
        maxProjects: plan.maxProjects,
        isActive: plan.isActive,
      });
    }
  }, [plan, isOpen, reset]);

  if (!isOpen || !plan) {
    return null;
  }

  const handleClose = () => {
    if (updateMutation.isPending) {
      return;
    }

    reset();
    onClose();
  };

  const onSubmit = (data: UpdatePlanSubmitData) => {
    updateMutation.mutate(
      {
        id: plan.id,
        data: {
          name: data.name,
          price: data.price,
          durationDays: data.durationDays,
          maxProjects: data.maxProjects,
          isActive: data.isActive,
        },
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
        bg-black/45
        px-4
        py-8
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full
          max-w-xl
          overflow-hidden
          rounded-3xl
          border
          border-stone-200
          bg-white
          shadow-2xl
        "
      >
        <div
          className="
            border-b
            border-stone-200
            bg-[#FAF6F0]
            px-6
            py-5
          "
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#4B3932]
                  text-white
                  shadow-sm
                "
              >
                <CreditCard size={20} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#4B3932]">
                  Update Plan
                </h2>

                <p className="mt-1 text-xs text-stone-500">
                  Update the subscription plan configuration.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={updateMutation.isPending}
              className="
                rounded-xl
                p-2
                text-stone-400
                transition-all
                duration-200
                hover:bg-white
                hover:text-[#4B3932]
                hover:shadow-sm
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              <X size={19} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
          <div>
            <label
              htmlFor="update-plan-name"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-[#4B3932]
              "
            >
              Plan Type
            </label>

            <select
              id="update-plan-name"
              {...register("name")}
              disabled={updateMutation.isPending}
              className="
                w-full
                rounded-xl
                border
                border-[#E7DDD3]
                bg-white
                px-4
                py-3
                text-sm
                font-medium
                text-[#4B3932]
                outline-none
                transition-all
                duration-200
                hover:border-[#CDBFB3]
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

            {errors.name && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="update-plan-price"
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

              <div className="relative">
                <span
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-sm
                    font-semibold
                    text-stone-400
                  "
                >
                  ₹
                </span>

                <input
                  id="update-plan-price"
                  type="number"
                  min="0"
                  step="0.01"
                  {...register("price")}
                  disabled={updateMutation.isPending}
                  placeholder="999"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#E7DDD3]
                    bg-white
                    py-3
                    pl-9
                    pr-4
                    text-sm
                    text-[#4B3932]
                    outline-none
                    transition-all
                    duration-200
                    placeholder:text-stone-300
                    hover:border-[#CDBFB3]
                    focus:border-[#4B3932]
                    focus:ring-2
                    focus:ring-[#4B3932]/10
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />
              </div>

              {errors.price && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="update-plan-duration"
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-[#4B3932]
                "
              >
                Duration
                <span className="ml-1 font-normal text-stone-400">
                  (Days)
                </span>
              </label>

              <input
                id="update-plan-duration"
                type="number"
                min="1"
                {...register("durationDays", {
                  setValueAs: (value) => value === "" ? null : Number(value),
                })}
                disabled={updateMutation.isPending}
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
                  hover:border-[#CDBFB3]
                  focus:border-[#4B3932]
                  focus:ring-2
                  focus:ring-[#4B3932]/10
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />

              {errors.durationDays && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.durationDays.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="update-plan-max-projects"
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-[#4B3932]
              "
            >
              Maximum Projects
              <span className="ml-1 font-normal text-stone-400">
                (Optional)
              </span>
            </label>

            <input
              id="update-plan-max-projects"
              type="number"
              min="1"
              {...register("maxProjects", {
                setValueAs: (value) => value === "" ? null : Number(value),
              })}
              disabled={updateMutation.isPending}
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
                hover:border-[#CDBFB3]
                focus:border-[#4B3932]
                focus:ring-2
                focus:ring-[#4B3932]/10
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />

            {errors.maxProjects && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.maxProjects.message}
              </p>
            )}
          </div>

          <div
            className="
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-[#E7DDD3]
              bg-[#FAF6F0]
              px-4
              py-3.5
            "
          >
            <div>
              <p className="text-sm font-semibold text-[#4B3932]">
                Active Plan
              </p>

              <p className="mt-0.5 text-xs text-stone-500">
                Make this plan available for subscriptions.
              </p>
            </div>

            <label className="relative inline-flex cursor-pointer items-center">
              <input
                id="update-plan-active"
                type="checkbox"
                {...register("isActive")}
                disabled={updateMutation.isPending}
                className="peer sr-only"
              />

              <div
                className="
                  h-6
                  w-11
                  rounded-full
                  bg-stone-300
                  transition-all
                  duration-200
                  peer-checked:bg-[#4B3932]
                  peer-focus:ring-2
                  peer-focus:ring-[#4B3932]/20
                  peer-disabled:cursor-not-allowed
                  peer-disabled:opacity-50
                  after:absolute
                  after:left-[3px]
                  after:top-[3px]
                  after:h-[18px]
                  after:w-[18px]
                  after:rounded-full
                  after:bg-white
                  after:shadow-sm
                  after:transition-all
                  after:content-['']
                  peer-checked:after:translate-x-5
                "
              />
            </label>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-[#E7DDD3]
              bg-white
              p-4
            "
          >
            <div className="flex items-start gap-3">
              <div
                className="
                  mt-0.5
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#FAF6F0]
                  text-[#4B3932]
                "
              >
                <CreditCard size={16} />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#4B3932]">
                  Plan Configuration
                </p>

                <p className="mt-1 text-xs leading-5 text-stone-500">
                  Changes to this plan will apply to future subscription
                  operations.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-stone-100 pt-5">
            <button
              type="button"
              onClick={handleClose}
              disabled={updateMutation.isPending}
              className="
                rounded-xl
                border
                border-[#E7DDD3]
                bg-white
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
              disabled={updateMutation.isPending}
              className="
                rounded-xl
                bg-[#4B3932]
                px-6
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
              {updateMutation.isPending ? "Updating..." : "Update Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}