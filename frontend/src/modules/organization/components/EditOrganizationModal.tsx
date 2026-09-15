import { Building2, Globe2, MapPin, Phone, X } from "lucide-react";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Organization } from "../types/organization.types";

import {
  organizationProfileSchema,
  type OrganizationProfileFormData,
} from "../validations/organization.schema";

import { companySizes, industries } from "@/modules/auth/constants/register";

interface EditOrganizationModalProps {
  organization: Organization;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (data: OrganizationProfileFormData) => void;
}

export default function EditOrganizationModal({
  organization,
  isOpen,
  isLoading,
  onClose,
  onSubmit,
}: EditOrganizationModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrganizationProfileFormData>({
    resolver: zodResolver(organizationProfileSchema),
    defaultValues: {
      name: "",
      industry: "",
      companySize: "",
      website: "",
      description: "",
      phone: "",
      country: "",
      state: "",
      city: "",
      address: "",
    },
  });

  useEffect(() => {
    if (!organization) {
      return;
    }

    reset({
      name: organization.name ?? "",
      industry: organization.industry ?? "",
      companySize: organization.companySize ?? "",
      website: organization.website ?? "",
      description: organization.description ?? "",
      phone: organization.phone ?? "",
      country: organization.country ?? "",
      state: organization.state ?? "",
      city: organization.city ?? "",
      address: organization.address ?? "",
    });
  }, [organization, reset]);

  if (!isOpen) {
    return null;
  }

  const inputClass =
    "w-full rounded-xl border border-[#E7DDD3] bg-white px-3.5 py-2.5 text-sm text-[#4B3932] outline-none transition-all duration-200 placeholder:text-stone-400 focus:border-[#4B3932] focus:ring-4 focus:ring-[#4B3932]/10";

  const selectClass =
    "w-full appearance-none rounded-xl border border-[#E7DDD3] bg-white px-3.5 py-2.5 text-sm text-[#4B3932] outline-none transition-all duration-200 focus:border-[#4B3932] focus:ring-4 focus:ring-[#4B3932]/10";

  const labelClass = "mb-1.5 block text-xs font-semibold text-[#4B3932]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2F211C]/45 px-4 py-6 backdrop-blur-sm">
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-[28px] border border-[#E7DDD3] bg-[#FAF6F0] shadow-2xl shadow-[#4B3932]/20">
        <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#4B3932] via-[#80685B] to-[#D8C9BD]" />

        <div className="flex shrink-0 items-center justify-between border-b border-[#E7DDD3] bg-white px-6 py-5 sm:px-7">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F0E7D5] text-[#4B3932] shadow-sm">
              <Building2 size={21} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#4B3932]">Edit Organization</h2>

                <span className="hidden rounded-full bg-[#F0E7D5] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#4B3932] sm:inline-flex">
                  Organization
                </span>
              </div>

              <p className="mt-0.5 text-xs text-stone-500">
                Update your organization profile information.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-stone-400 transition hover:bg-[#FAF6F0] hover:text-[#4B3932] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="min-h-0 flex-1 overflow-y-auto">
          <div className="space-y-7 p-6 sm:p-7">
            <section>
              <div className="mb-4 flex items-center gap-2.5">
                <div className="h-5 w-1 rounded-full bg-[#4B3932]" />

                <div>
                  <h3 className="text-sm font-bold text-[#4B3932]">Basic Information</h3>

                  <p className="text-[11px] text-stone-400">
                    General information about your organization.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Organization Name
                  </label>

                  <input
                    id="name"
                    {...register("name")}
                    placeholder="Organization name"
                    className={inputClass}
                  />

                  {errors.name && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="industry" className={labelClass}>
                    Industry
                  </label>

                  <select id="industry" {...register("industry")} className={selectClass}>
                    <option value="">Select industry</option>

                    {industries.map((industry) => (
                      <option key={industry.value} value={industry.value}>
                        {industry.label}
                      </option>
                    ))}
                  </select>

                  {errors.industry && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.industry.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="companySize" className={labelClass}>
                    Company Size
                  </label>

                  <select id="companySize" {...register("companySize")} className={selectClass}>
                    <option value="">Select company size</option>

                    {companySizes.map((size) => (
                      <option key={size.value} value={size.value}>
                        {size.label}
                      </option>
                    ))}
                  </select>

                  {errors.companySize && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.companySize.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="website" className={labelClass}>
                    Website
                  </label>

                  <div className="relative">
                    <Globe2
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                    />

                    <input
                      id="website"
                      type="url"
                      {...register("website")}
                      placeholder="https://example.com"
                      className={`${inputClass} pl-10`}
                    />
                  </div>

                  {errors.website && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.website.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="description" className={labelClass}>
                  Description
                </label>

                <textarea
                  id="description"
                  {...register("description")}
                  rows={3}
                  placeholder="Briefly describe your organization..."
                  className={`${inputClass} resize-none`}
                />

                {errors.description && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </section>

            <section className="border-t border-[#E7DDD3] pt-6">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="h-5 w-1 rounded-full bg-[#4B3932]" />

                <div>
                  <h3 className="text-sm font-bold text-[#4B3932]">Contact Information</h3>

                  <p className="text-[11px] text-stone-400">
                    Contact details for your organization.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone
                  </label>

                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                    />

                    <input
                      id="phone"
                      type="tel"
                      {...register("phone")}
                      placeholder="Organization phone number"
                      className={`${inputClass} pl-10`}
                    />
                  </div>

                  {errors.phone && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="country" className={labelClass}>
                    Country
                  </label>

                  <input
                    id="country"
                    {...register("country")}
                    placeholder="Country"
                    className={inputClass}
                  />

                  {errors.country && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.country.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="state" className={labelClass}>
                    State
                  </label>

                  <input
                    id="state"
                    {...register("state")}
                    placeholder="State"
                    className={inputClass}
                  />

                  {errors.state && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.state.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="city" className={labelClass}>
                    City
                  </label>

                  <div className="relative">
                    <MapPin
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                    />

                    <input
                      id="city"
                      {...register("city")}
                      placeholder="City"
                      className={`${inputClass} pl-10`}
                    />
                  </div>

                  {errors.city && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">{errors.city.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="address" className={labelClass}>
                  Address
                </label>

                <textarea
                  id="address"
                  {...register("address")}
                  rows={2}
                  placeholder="Full organization address"
                  className={`${inputClass} resize-none`}
                />

                {errors.address && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </section>
          </div>

          <div className="sticky bottom-0 flex shrink-0 items-center justify-between gap-3 border-t border-[#E7DDD3] bg-white/95 px-6 py-4 backdrop-blur sm:px-7">
            <p className="hidden text-[11px] text-stone-400 sm:block">
              Changes will update your organization profile.
            </p>

            <div className="ml-auto flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="rounded-xl border border-[#E7DDD3] bg-white px-5 py-2.5 text-sm font-semibold text-[#4B3932] transition hover:bg-[#FAF6F0] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex min-w-32 items-center justify-center rounded-xl bg-[#4B3932] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#3B2E29] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Saving...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
