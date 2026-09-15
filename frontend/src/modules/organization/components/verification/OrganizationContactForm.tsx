import { Globe2, MapPin, Phone } from "lucide-react";

import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { OrganizationProfileFormData } from "../../validations/organization.schema";

interface OrganizationContactFormProps {
  register: UseFormRegister<OrganizationProfileFormData>;
  errors: FieldErrors<OrganizationProfileFormData>;
  onBack: () => void;
  onNext: () => void;
}

export default function OrganizationContactForm({
  register,
  errors,
  onBack,
  onNext,
}: OrganizationContactFormProps) {
  return (
    <section className="w-full rounded-3xl border border-[#E7DDD3] bg-white p-6 shadow-xl sm:p-8">

      <div className="mb-7 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F0E7D5] text-[#4B3932]">
          <Globe2 size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#4B3932]">Contact & Location</h2>

          <p className="mt-1 text-sm text-stone-500">
            Add your organization's contact information.
          </p>
        </div>
      </div>

      <div className="grid gap-x-5 gap-y-5 md:grid-cols-2">
        <div>
          <label htmlFor="website" className="mb-2 block text-sm font-semibold text-[#4B3932]">
            Website
          </label>

          <div className="relative">
            <Globe2
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
            />

            <input
              id="website"
              type="url"
              {...register("website")}
              placeholder="https://example.com"
              className="
                w-full
                rounded-xl
                border
                border-[#E7DDD3]
                py-3
                pl-10
                pr-4
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
          </div>

          {errors.website && (
            <p className="mt-1.5 text-xs font-medium text-red-500">{errors.website.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-[#4B3932]">
            Phone
          </label>

          <div className="relative">
            <Phone
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
            />

            <input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder="Organization phone number"
              className="
                w-full
                rounded-xl
                border
                border-[#E7DDD3]
                py-3
                pl-10
                pr-4
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
          </div>

          {errors.phone && (
            <p className="mt-1.5 text-xs font-medium text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="country" className="mb-2 block text-sm font-semibold text-[#4B3932]">
            Country
          </label>

          <input
            id="country"
            {...register("country")}
            placeholder="Enter country"
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

          {errors.country && (
            <p className="mt-1.5 text-xs font-medium text-red-500">{errors.country.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="state" className="mb-2 block text-sm font-semibold text-[#4B3932]">
            State
          </label>

          <input
            id="state"
            {...register("state")}
            placeholder="Enter state"
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

          {errors.state && (
            <p className="mt-1.5 text-xs font-medium text-red-500">{errors.state.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="city" className="mb-2 block text-sm font-semibold text-[#4B3932]">
            City
          </label>

          <div className="relative">
            <MapPin
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
            />

            <input
              id="city"
              {...register("city")}
              placeholder="Enter city"
              className="
                w-full
                rounded-xl
                border
                border-[#E7DDD3]
                py-3
                pl-10
                pr-4
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
          </div>

          {errors.city && (
            <p className="mt-1.5 text-xs font-medium text-red-500">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="address" className="mb-2 block text-sm font-semibold text-[#4B3932]">
            Address
          </label>

          <textarea
            id="address"
            rows={2}
            {...register("address")}
            placeholder="Full organization address"
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

          {errors.address && (
            <p className="mt-1.5 text-xs font-medium text-red-500">{errors.address.message}</p>
          )}
        </div>
      </div>

      <div className="mt-7 flex justify-between border-t border-[#E7DDD3] pt-6">
        <button
          type="button"
          onClick={onBack}
          className="
            rounded-xl
            border
            border-[#E7DDD3]
            px-6
            py-3
            text-sm
            font-semibold
            text-[#4B3932]
            transition
            hover:bg-[#FAF6F0]
          "
        >
          Back
        </button>

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
          Review Details
        </button>
      </div>
    </section>
  );
}
