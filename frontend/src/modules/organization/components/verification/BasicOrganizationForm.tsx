import { Building2 } from "lucide-react";

import type {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import type { OrganizationProfileFormData } from "../../validations/organization.schema";

interface BasicOrganizationFormProps {
  register: UseFormRegister<OrganizationProfileFormData>;
  errors: FieldErrors<OrganizationProfileFormData>;
  onNext: () => void;
}

export default function BasicOrganizationForm({
  register,
  errors,
  onNext,
}: BasicOrganizationFormProps) {
  return (
    <section className="w-full rounded-3xl border border-[#E7DDD3] bg-white p-6 shadow-xl sm:p-8">

      <div className="mb-7 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F0E7D5] text-[#4B3932]">
          <Building2 size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#4B3932]">
            Basic Information
          </h2>

          <p className="mt-1 text-sm text-stone-500">
            Tell us about your organization.
          </p>
        </div>
      </div>

      <div className="space-y-5">

        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-[#4B3932]"
          >
            Organization Name
          </label>

          <input
            id="name"
            {...register("name")}
            placeholder="Enter organization name"
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
              transition
              placeholder:text-stone-400
              focus:border-[#4B3932]
              focus:ring-4
              focus:ring-[#4B3932]/10
            "
          />

          {errors.name && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="industry"
            className="mb-2 block text-sm font-semibold text-[#4B3932]"
          >
            Industry
          </label>

          <input
            id="industry"
            {...register("industry")}
            placeholder="e.g. Finance, Healthcare, Technology"
            className="
              w-full
              rounded-xl
              border
              border-[#E7DDD3]
              px-4
              py-3
              text-sm
              text-[#4B3932]
              outline-none
              transition
              placeholder:text-stone-400
              focus:border-[#4B3932]
              focus:ring-4
              focus:ring-[#4B3932]/10
            "
          />

          {errors.industry && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.industry.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="companySize"
            className="mb-2 block text-sm font-semibold text-[#4B3932]"
          >
            Company Size
          </label>

          <input
            id="companySize"
            {...register("companySize")}
            placeholder="e.g. 1-20, 21-100, 101-500"
            className="
              w-full
              rounded-xl
              border
              border-[#E7DDD3]
              px-4
              py-3
              text-sm
              text-[#4B3932]
              outline-none
              transition
              placeholder:text-stone-400
              focus:border-[#4B3932]
              focus:ring-4
              focus:ring-[#4B3932]/10
            "
          />

          {errors.companySize && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.companySize.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold text-[#4B3932]"
          >
            Description
          </label>

          <textarea
            id="description"
            rows={4}
            {...register("description")}
            placeholder="Briefly describe your organization"
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-[#E7DDD3]
              px-4
              py-3
              text-sm
              text-[#4B3932]
              outline-none
              transition
              placeholder:text-stone-400
              focus:border-[#4B3932]
              focus:ring-4
              focus:ring-[#4B3932]/10
            "
          />

          {errors.description && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-7 flex justify-end border-t border-[#E7DDD3] pt-6">
        <button
          type="button"
          onClick={onNext}
          className="
            rounded-xl
            bg-[#4B3932]
            px-7
            py-3
            text-sm
            font-semibold
            text-white
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-[#3B2E29]
            hover:shadow-lg
          "
        >
          Continue
        </button>
      </div>
    </section>
  );
}