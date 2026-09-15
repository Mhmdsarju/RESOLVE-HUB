import { KeyRound, ShieldCheck } from "lucide-react";
import { useState } from "react";

import OrganizationCard from "../components/OrganizationCard";
import EditOrganizationModal from "../components/EditOrganizationModal";
import { ChangePasswordModal } from "@/modules/auth/components/ChnagePaswordModal";

import { useOrganization } from "../hooks/useOrganization";
import { useUpdateOrganization } from "../hooks/useUpdateOrganization";

import type { OrganizationProfileFormData } from "../validations/organization.schema";

export default function OrganizationSettingsPage() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const { data: organization, isLoading, isError } = useOrganization();

  const updateOrganizationMutation = useUpdateOrganization();

  const handleUpdate = async (data: OrganizationProfileFormData) => {
    try {
      await updateOrganizationMutation.mutateAsync(data);
      setIsEditOpen(false);
    } catch (error: unknown) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-[calc(100vh-5rem)] bg-[#FAF6F0] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 space-y-3">
            <div className="h-4 w-32 animate-pulse rounded-full bg-[#E7DDD3]" />
            <div className="h-8 w-64 animate-pulse rounded-xl bg-[#E7DDD3]" />
            <div className="h-4 w-96 max-w-full animate-pulse rounded-full bg-[#F0E7D5]" />
          </div>

          <div className="rounded-3xl border border-[#E7DDD3] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 animate-pulse rounded-2xl bg-[#F0E7D5]" />

              <div className="space-y-3">
                <div className="h-5 w-48 animate-pulse rounded-lg bg-[#E7DDD3]" />
                <div className="h-4 w-32 animate-pulse rounded-lg bg-[#F0E7D5]" />
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-24 animate-pulse rounded-2xl bg-[#FAF6F0]" />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isError || !organization) {
    return (
      <main className="min-h-[calc(100vh-5rem)] bg-[#FAF6F0] px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-lg">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <ShieldCheck size={25} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#4B3932]">Failed to load organization</h2>

            <p className="mt-2 text-sm leading-6 text-stone-500">
              We couldn't load your organization information. Please refresh the page and try again.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[#FAF6F0] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-7">
          <div className="inline-flex items-center rounded-full bg-[#F0E7D5] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#4B3932]">
            Organization Settings
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#4B3932] sm:text-3xl">
            Organization Settings
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-stone-500">
            Manage your organization information and account security.
          </p>
        </div>

        <div className="rounded-[28px] border border-[#E7DDD3] bg-white p-2 shadow-sm sm:p-3">
          <OrganizationCard
            organization={organization}
            onEdit={() => setIsEditOpen(true)}
            onChangePassword={() => setIsChangePasswordOpen(true)}
          />
        </div>

        <div className="mt-5 rounded-3xl border border-[#E7DDD3] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0E7D5] text-[#4B3932]">
                <KeyRound size={18} />
              </div>

              <div>
                <h2 className="text-sm font-bold text-[#4B3932]">Account Security</h2>

                <p className="mt-1 text-xs leading-5 text-stone-500">
                  Keep your account protected with a strong password.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsChangePasswordOpen(true)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#E7DDD3] bg-[#FAF6F0] px-5 py-2.5 text-xs font-semibold text-[#4B3932] transition-all duration-200 hover:border-[#CBB9AA] hover:bg-[#F0E7D5]"
            >
              <KeyRound size={15} />
              Change Password
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-2xl border border-[#E7DDD3] bg-[#F0E7D5]/40 px-5 py-4">
          <ShieldCheck size={18} className="shrink-0 text-[#4B3932]" />

          <p className="text-xs leading-5 text-stone-600">
            Your organization information is securely managed through ResolveHub.
          </p>
        </div>

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
    </main>
  );
}
