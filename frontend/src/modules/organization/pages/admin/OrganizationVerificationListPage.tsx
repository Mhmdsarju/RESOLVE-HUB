import {
  ArrowRight,
  Building2,
  Clock3,
  RefreshCw,
  Users,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { usePendingOrganizationVerifications } from "../../hooks/usePendingOrganizationVerifications";
import { usePlans } from "@/modules/plan/hooks/usePlans";

export default function OrganizationVerificationListPage() {
  const navigate = useNavigate();

  const {
    data: organizations,
    isLoading,
    isError,
  } = usePendingOrganizationVerifications();

  const { data: plans, isLoading: isPlansLoading } = usePlans();

  const hasMinimumPlans = (plans?.length ?? 0) >= 2;

  if (isLoading || isPlansLoading) {
    return (
      <div className="space-y-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-3xl border border-[#E7DDD3] bg-white shadow-sm"
          >
            <div className="flex h-full items-center gap-5 px-6">
              <div className="h-14 w-14 shrink-0 rounded-2xl bg-[#F0E7D5]" />

              <div className="flex-1 space-y-3">
                <div className="h-4 w-48 rounded bg-[#F0E7D5]" />
                <div className="h-3 w-32 rounded bg-[#FAF6F0]" />
                <div className="h-3 w-40 rounded bg-[#FAF6F0]" />
              </div>

              <div className="hidden w-32 space-y-3 md:block">
                <div className="h-3 w-20 rounded bg-[#F0E7D5]" />
                <div className="h-4 w-24 rounded bg-[#FAF6F0]" />
              </div>

              <div className="hidden w-32 space-y-3 md:block">
                <div className="h-3 w-20 rounded bg-[#F0E7D5]" />
                <div className="h-4 w-24 rounded bg-[#FAF6F0]" />
              </div>

              <div className="h-10 w-28 rounded-xl bg-[#FAF6F0]" />
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

        <h3 className="mt-5 text-lg font-bold text-[#4B3932]">
          Unable to load organizations
        </h3>

        <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
          Something went wrong while loading organizations waiting for
          verification.
        </p>
      </div>
    );
  }

  if (!organizations || organizations.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#4B3932]/10 bg-[#4B3932]/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#4B3932]">
            <Building2 size={13} />
            Verification Management
          </div>

          <h1 className="text-3xl font-black tracking-tight text-[#4B3932]">
            Organization Verifications
          </h1>

          <p className="mt-1 text-sm font-medium text-stone-500">
            Review organizations waiting for verification.
          </p>
        </div>

        <div className="group flex min-h-72 flex-col items-center justify-center rounded-3xl border border-dashed border-[#D8C9BD] bg-white px-6 text-center shadow-sm transition-all duration-300 hover:border-[#CBB9AA] hover:bg-[#FFFCF8] hover:shadow-md">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0E7D5] text-[#4B3932] transition-all duration-300 group-hover:scale-110">
            <CheckCircle2 size={28} />
          </div>

          <h3 className="mt-5 text-lg font-bold text-[#4B3932]">
            No pending organizations
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
            All organization verification requests have been reviewed. New
            requests will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#4B3932]/10 bg-[#4B3932]/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#4B3932]">
            <Building2 size={13} />
            Verification Management
          </div>

          <h1 className="text-3xl font-black tracking-tight text-[#4B3932]">
            Organization Verifications
          </h1>

          <p className="mt-1 text-sm font-medium text-stone-500">
            Review organizations waiting for verification.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200/80 bg-white px-4 py-3 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
            Available Plans
          </p>

          <p className="mt-1 flex items-center gap-2 text-lg font-black text-[#4B3932]">
            {plans?.length ?? 0}

            <span
              className={`text-xs font-bold ${
                hasMinimumPlans
                  ? "text-emerald-600"
                  : "text-amber-600"
              }`}
            >
              {hasMinimumPlans ? "Ready" : "2 Required"}
            </span>
          </p>
        </div>
      </div>

      {!hasMinimumPlans && (
        <div className="relative overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-[#FFF9EE] to-white p-6 shadow-sm">
          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-amber-100/60 blur-2xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <CreditCard size={22} />
              </div>

              <div>
                <h2 className="text-base font-black text-[#4B3932]">
                  Create at least 2 plans to continue
                </h2>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-stone-500">
                  Organization verification is unavailable until the platform
                  has at least two subscription plans configured.
                </p>

                <p className="mt-2 text-xs font-bold text-amber-700">
                  Current plans: {plans?.length ?? 0} / 2
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/plans")}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#4B3932] px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3B2E29] hover:shadow-lg"
            >
              Go to Plans
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="space-y-5">
        {organizations.map((organization) => (
          <div
            key={organization.verificationId}
            className="group overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-lg"
          >
            <div className="flex flex-col gap-6 p-5 sm:p-6 lg:flex-row lg:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-4 lg:min-w-[260px]">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F0E7D5] text-[#4B3932] transition-transform duration-300 group-hover:scale-105">
                  <Building2 size={25} />
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-base font-black text-[#4B3932] sm:text-lg">
                    {organization.organizationName}
                  </h2>

                  <p className="mt-1 truncate text-sm font-medium text-stone-500">
                    {organization.industry ?? "Industry not provided"}
                  </p>

                  <p className="mt-1 truncate text-xs font-medium text-stone-400">
                    ID: {organization.organizationId}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:flex lg:items-center lg:gap-10">
                <div className="min-w-[110px]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-stone-400">
                    <Users size={14} />
                    Company Size
                  </div>

                  <p className="mt-1.5 text-sm font-bold text-[#4B3932]">
                    {organization.companySize ?? "N/A"}
                  </p>
                </div>

                <div className="min-w-[120px]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-stone-400">
                    <Clock3 size={14} />
                    Submitted
                  </div>

                  <p className="mt-1.5 text-sm font-bold text-[#4B3932]">
                    {organization.submittedAt
                      ? new Date(
                          organization.submittedAt,
                        ).toLocaleDateString(undefined, {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-stone-400">
                    Status
                  </p>

                  <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 ring-1 ring-inset ring-amber-600/20">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                    {organization.status}
                  </span>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                {hasMinimumPlans ? (
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/organizations/${organization.organizationId}/verification`,
                      )
                    }
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#4B3932] px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3B2E29] hover:shadow-lg lg:w-auto"
                  >
                    Review
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => navigate("/plans")}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#4B3932]/15 bg-[#F0E7D5]/50 px-5 py-3 text-sm font-bold text-[#4B3932] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F0E7D5] hover:shadow-md lg:w-auto"
                  >
                    Create Plans
                    <CreditCard size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}