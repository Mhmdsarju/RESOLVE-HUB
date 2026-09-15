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
                <h2 className="text-lg font-bold text-[#4B3932]">Create Plan</h2>

                <p className="mt-1 text-xs text-stone-500">
                  Configure a subscription plan for your organizations.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={createMutation.isPending}
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
              htmlFor="plan-name"
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

            {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
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
                <p className="mt-1.5 text-xs text-red-500">{errors.price.message}</p>
              )}
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
                <span className="ml-1 font-normal text-stone-400">(Days)</span>
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
                  hover:border-[#CDBFB3]
                  focus:border-[#4B3932]
                  focus:ring-2
                  focus:ring-[#4B3932]/10
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />

              {errors.durationDays && (
                <p className="mt-1.5 text-xs text-red-500">{errors.durationDays.message}</p>
              )}
            </div>
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
              <span className="ml-1 font-normal text-stone-400">(Optional)</span>
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
                hover:border-[#CDBFB3]
                focus:border-[#4B3932]
                focus:ring-2
                focus:ring-[#4B3932]/10
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />

            {errors.maxProjects && (
              <p className="mt-1.5 text-xs text-red-500">{errors.maxProjects.message}</p>
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
              <p className="text-sm font-semibold text-[#4B3932]">Active Plan</p>

              <p className="mt-0.5 text-xs text-stone-500">
                Make this plan available for subscriptions.
              </p>
            </div>

            <label className="relative inline-flex cursor-pointer items-center">
              <input
                id="plan-active"
                type="checkbox"
                {...register("isActive")}
                disabled={createMutation.isPending}
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
                <p className="text-sm font-semibold text-[#4B3932]">Plan Configuration</p>

                <p className="mt-1 text-xs leading-5 text-stone-500">
                  Set the pricing, subscription duration, and maximum project limit for this plan.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-stone-100 pt-5">
            <button
              type="button"
              onClick={handleClose}
              disabled={createMutation.isPending}
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
              disabled={createMutation.isPending}
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
              {createMutation.isPending ? "Creating..." : "Create Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
