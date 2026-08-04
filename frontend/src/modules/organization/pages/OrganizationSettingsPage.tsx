import { useState } from "react";

import OrganizationCard from "../components/OrganizationCard";
import EditOrganizationModal from "../components/EditOrganizationModal";
import { ChangePasswordModal } from "@/modules/auth/components/ChnagePaswordModal"; 

import { useOrganization } from "../hooks/useOrganization";
import { useUpdateOrganization } from "../hooks/useUpdateOrganization";

import type { OrganizationFormData } from "../validations/organization.schema";

export default function OrganizationSettingsPage() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const { data: organization, isLoading, isError } = useOrganization();

  const updateOrganizationMutation = useUpdateOrganization();

  const handleUpdate = async (data: OrganizationFormData) => {
    try {
      await updateOrganizationMutation.mutateAsync(data);

      setIsEditOpen(false);
    } catch(error:unknown) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="text-stone-500">Loading organization...</p>
      </div>
    );
  }

  if (isError || !organization) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-red-200
          bg-red-50
          p-6
        "
      >
        <h2 className="text-lg font-semibold text-red-600">
          Failed to load organization
        </h2>

        <p className="mt-2 text-sm text-red-500">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#4B3932]">
          Organization Settings
        </h1>

        <p className="mt-2 text-stone-500">
          View and update your organization's information.
        </p>
      </div>

      <OrganizationCard
        organization={organization}
        onEdit={() => setIsEditOpen(true)}
        onChangePassword={() => setIsChangePasswordOpen(true)}
      />

      <EditOrganizationModal
        organization={organization}
        isOpen={isEditOpen}
        isLoading={updateOrganizationMutation.isPending}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleUpdate}
      />

      <ChangePasswordModal
        open={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
    </div>
  );
}