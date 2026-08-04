import { Pencil, Lock } from "lucide-react";

import type { Organization } from "../types/organization.types";

interface OrganizationCardProps {
  organization: Organization;
  onEdit: () => void;
  onChangePassword: () => void;
}

export default function OrganizationCard({
  organization,
  onEdit,
  onChangePassword,
}: OrganizationCardProps) {
  return (
    <>
      <section
        className="
          rounded-2xl
          border
          border-[#E7DDD3]
          bg-white
          p-8
          shadow-sm
        "
      >
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#4B3932]">
              Organization Information
            </h2>

            <p className="mt-1 text-sm text-stone-500">
              View and manage your organization details.
            </p>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-[#4B3932]
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-[#5A463E]
            "
          >
            <Pencil size={16} />
            Edit
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <InfoItem
            label="Organization Name"
            value={organization.name}
          />

          <InfoItem
            label="Industry"
            value={organization.industry ?? "-"}
          />

          <InfoItem
            label="Company Size"
            value={organization.companySize ?? "-"}
          />

          <div>
            <p className="mb-2 text-sm font-medium text-stone-500">
              Status
            </p>

            <span
              className="
                inline-flex
                rounded-full
                bg-green-100
                px-3
                py-1
                text-sm
                font-semibold
                text-green-700
              "
            >
              {organization.status}
            </span>
          </div>
        </div>
      </section>
      <section
        className="
          mt-6
          rounded-2xl
          border
          border-[#E7DDD3]
          bg-white
          p-8
          shadow-sm
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Lock
                size={22}
                className="text-[#4B3932]"
              />

              <h2 className="text-2xl font-bold text-[#4B3932]">
                Security
              </h2>
            </div>

            <p className="mt-2 text-sm text-stone-500">
              Keep your account secure by updating your password regularly.
            </p>
          </div>

          <button
            type="button"
            onClick={onChangePassword}
            className="
              rounded-xl
              bg-[#4B3932]
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-[#5A463E]
            "
          >
            Change Password
          </button>
        </div>
      </section>
    </>
  );
}

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({
  label,
  value,
}: InfoItemProps) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-stone-500">
        {label}
      </p>

      <p className="text-lg font-semibold text-[#4B3932]">
        {value}
      </p>
    </div>
  );
}