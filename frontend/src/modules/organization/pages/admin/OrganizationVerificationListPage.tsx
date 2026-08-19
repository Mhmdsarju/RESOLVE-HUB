import { ArrowRight, Building2, Clock3, RefreshCw, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { usePendingOrganizationVerifications } from "../../hooks/usePendingOrganizationVerifications";

export default function OrganizationVerificationListPage() {
  const navigate = useNavigate();

  const { data: organizations, isLoading, isError } = usePendingOrganizationVerifications();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-3xl border border-[#E7DDD3] bg-white shadow-sm"
          >
            <div className="flex h-full items-center gap-5 px-6">
              <div className="h-14 w-14 shrink-0 rounded-2xl bg-[#F0E7D5]" />

              <div className="flex-1 space-y-3">
                <div className="h-4 w-48 rounded bg-[#F0E7D5]" />
                <div className="h-3 w-32 rounded bg-[#FAF6F0]" />
              </div>

              <div className="hidden w-32 space-y-3 md:block">
                <div className="h-3 w-20 rounded bg-[#F0E7D5]" />
                <div className="h-4 w-24 rounded bg-[#FAF6F0]" />
              </div>

              <div className="hidden w-32 space-y-3 md:block">
                <div className="h-3 w-20 rounded bg-[#F0E7D5]" />
                <div className="h-4 w-24 rounded bg-[#FAF6F0]" />
              </div>

              <div className="h-10 w-24 rounded-xl bg-[#FAF6F0]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center rounded-3xl border border-red-100 bg-white px-6 text-center shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
          <RefreshCw size={24} />
        </div>

        <h3 className="mt-5 text-lg font-bold text-[#4B3932]">Unable to load organizations</h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
          Something went wrong while loading organizations waiting for verification.
        </p>
      </div>
    );
  }

  if (!organizations || organizations.length === 0) {
    return (
      <div className="group flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-[#D8C9BD] bg-white px-6 text-center shadow-sm transition-all duration-300 hover:border-[#CBB9AA] hover:bg-[#FFFCF8] hover:shadow-md">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0E7D5] text-[#4B3932] transition-all duration-300 group-hover:scale-110 group-hover:rotate-2">
          <Building2 size={28} />
        </div>

        <h3 className="mt-5 text-lg font-bold text-[#4B3932]">No pending organizations</h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
          All organization verification requests have been reviewed. New requests will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0E7D5] text-[#4B3932]">
          <Building2 size={22} />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[#4B3932]">Organization Verifications</h1>

          <p className="mt-1 text-sm text-stone-500">
            Review organizations waiting for verification.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {organizations.map((organization) => (
          <div
            key={organization.verificationId}
            className="group overflow-hidden rounded-3xl border border-[#E7DDD3] bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#CBB9AA] hover:shadow-lg"
          >
            <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-4 lg:min-w-260px">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F0E7D5] text-[#4B3932] transition-transform duration-300 group-hover:scale-105">
                  <Building2 size={25} />
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-base font-bold text-[#4B3932] sm:text-lg">
                    {organization.organizationName}
                  </h2>

                  <p className="mt-1 truncate text-sm text-stone-500">
                    {organization.industry ?? "Industry not provided"}
                  </p>

                  <p className="mt-1 truncate text-xs text-stone-400">
                    ID: {organization.organizationId}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex lg:items-center lg:gap-10">
                <div className="min-w-110px">
                  <div className="flex items-center gap-2 text-xs font-medium text-stone-400">
                    <Users size={14} />
                    Company Size
                  </div>

                  <p className="mt-1.5 text-sm font-semibold text-[#4B3932]">
                    {organization.companySize ?? "N/A"}
                  </p>
                </div>

                <div className="min-w-120px">
                  <div className="flex items-center gap-2 text-xs font-medium text-stone-400">
                    <Clock3 size={14} />
                    Submitted
                  </div>

                  <p className="mt-1.5 text-sm font-semibold text-[#4B3932]">
                    {organization.submittedAt
                      ? new Date(organization.submittedAt).toLocaleDateString(undefined, {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-stone-400">Status</p>

                  <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                    {organization.status}
                  </span>
                </div>
              </div>

              <div className="border-t border-[#F0E7D5] pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/organizations/${organization.organizationId}/verification`)
                  }
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#4B3932] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3B2E29] hover:shadow-lg lg:w-auto"
                >
                  Review
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
