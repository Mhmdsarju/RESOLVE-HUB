import { useEffect } from "react";
import { X } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Organization } from "../types/organization.types";

import {  organizationSchema,  type OrganizationFormData,} from "../validations/organization.schema";

import {  companySizes,  industries,} from "@/modules/auth/constants/register";

interface EditOrganizationModalProps {
  organization: Organization;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (data: OrganizationFormData) => void;
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
  } = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
  });

  useEffect(() => {
    reset({
      name: organization.name,
      industry: organization.industry ?? "",
      companySize: organization.companySize ?? "",
    });
  }, [organization, reset]);

  if (!isOpen) {
    return null;
  }

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
        p-4
      "
    >
      <div
        className="
          w-full
          max-w-lg
          rounded-2xl
          bg-white
          p-8
          shadow-2xl
        "
      >

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#4B3932]">
              Edit Organization
            </h2>

            <p className="mt-1 text-sm text-stone-500">
              Update your organization details.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              p-2
              text-stone-500
              transition
              hover:bg-stone-100
              hover:text-[#4B3932]
            "
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-[#4B3932]"
            >
              Organization Name
            </label>

            <input
              id="name"
              {...register("name")}
              className="
                w-full
                rounded-xl
                border
                border-[#E7DDD3]
                px-4
                py-3
                text-[#4B3932]
                outline-none
                transition-all
                duration-200
                focus:border-[#4B3932]
                focus:ring-4
                focus:ring-[#4B3932]/10
              "
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>


          <div>
            <label
              htmlFor="industry"
              className="mb-2 block text-sm font-medium text-[#4B3932]"
            >
              Industry
            </label>

            <select
              id="industry"
              {...register("industry")}
              className="
                w-full
                rounded-xl
                border
                border-[#E7DDD3]
                bg-white
                px-4
                py-3
                text-[#4B3932]
                outline-none
                transition-all
                duration-200
                focus:border-[#4B3932]
                focus:ring-4
                focus:ring-[#4B3932]/10
              "
            >
              {industries.map((industry) => (
                <option
                  key={industry.value}
                  value={industry.value}
                >
                  {industry.label}
                </option>
              ))}
            </select>

            {errors.industry && (
              <p className="mt-1 text-sm text-red-500">
                {errors.industry.message}
              </p>
            )}
          </div>


          <div>
            <label
              htmlFor="companySize"
              className="mb-2 block text-sm font-medium text-[#4B3932]"
            >
              Company Size
            </label>

            <select
              id="companySize"
              {...register("companySize")}
              className="
                w-full
                rounded-xl
                border
                border-[#E7DDD3]
                bg-white
                px-4
                py-3
                text-[#4B3932]
                outline-none
                transition-all
                duration-200
                focus:border-[#4B3932]
                focus:ring-4
                focus:ring-[#4B3932]/10
              "
            >
              {companySizes.map((size) => (
                <option
                  key={size.value}
                  value={size.value}
                >
                  {size.label}
                </option>
              ))}
            </select>

            {errors.companySize && (
              <p className="mt-1 text-sm text-red-500">
                {errors.companySize.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="
                rounded-xl
                border
                border-[#E7DDD3]
                px-5
                py-2.5
                text-[#4B3932]
                transition
                hover:bg-stone-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="
                rounded-xl
                bg-[#4B3932]
                px-5
                py-2.5
                font-medium
                text-white
                transition
                hover:bg-[#5A463E]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}