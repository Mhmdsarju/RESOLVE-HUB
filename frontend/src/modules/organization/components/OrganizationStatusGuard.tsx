import { AlertCircle, CheckCircle2, Clock3, ShieldAlert } from "lucide-react";

import type { ReactNode } from "react";

import { useOrganization } from "../hooks/useOrganization";

interface OrganizationStatusGuardProps {
  children: ReactNode;
}

export default function OrganizationStatusGuard({ children }: OrganizationStatusGuardProps) {
  const { data: organization, isLoading, isError } = useOrganization();

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="w-full max-w-md rounded-3xl border border-[#E7DDD3] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl bg-[#F0E7D5]">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#D8C9BD] border-t-[#4B3932]" />
          </div>

          <h2 className="mt-6 text-lg font-bold text-[#4B3932]">Checking organization status</h2>

          <p className="mt-2 text-sm leading-6 text-stone-500">
            Please wait while we verify your organization access.
          </p>
        </div>
      </div>
    );
  }

  if (isError || !organization) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <AlertCircle size={30} />
          </div>

          <h2 className="mt-6 text-lg font-bold text-[#4B3932]">Unable to load organization</h2>

          <p className="mt-2 text-sm leading-6 text-stone-500">
            We couldn't verify your organization status right now. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  switch (organization.status) {
    case "PENDING_PROFILE":
      return (
        <div className="flex min-h-[70vh] items-center justify-center px-6 py-10">
          <div className="w-full max-w-lg rounded-3xl border border-[#E7DDD3] bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0E7D5] text-[#4B3932]">
              <AlertCircle size={30} />
            </div>

            <span className="mt-6 inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
              PROFILE INCOMPLETE
            </span>

            <h1 className="mt-4 text-2xl font-bold text-[#4B3932]">
              Complete Your Organization Profile
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
              Your organization profile needs to be completed before you can access ResolveHub.
            </p>
          </div>
        </div>
      );

    case "PENDING_VERIFICATION":
      return (
        <div className="flex min-h-[70vh] items-center justify-center px-6 py-10">
          <div className="w-full max-w-lg rounded-3xl border border-[#E7DDD3] bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <Clock3 size={30} />
            </div>

            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
              <Clock3 size={14} />
              VERIFICATION PENDING
            </span>

            <h1 className="mt-4 text-2xl font-bold text-[#4B3932]">
              Your Organization Is Under Review
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
              Your organization verification request has been submitted successfully. A Super Admin
              is reviewing your details.
            </p>

            <div className="mt-6 rounded-2xl bg-[#FAF6F0] p-4 text-left">
              <div className="flex items-start gap-3">
                <Clock3 size={19} className="mt-0.5 shrink-0 text-[#4B3932]" />

                <div>
                  <p className="text-sm font-semibold text-[#4B3932]">
                    Access is temporarily restricted
                  </p>

                  <p className="mt-1 text-xs leading-5 text-stone-500">
                    You'll get access to the ResolveHub workspace once your organization has been
                    approved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "REJECTED":
      return (
        <div className="flex min-h-[70vh] items-center justify-center px-6 py-10">
          <div className="w-full max-w-lg rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <ShieldAlert size={30} />
            </div>

            <span className="mt-6 inline-flex rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
              VERIFICATION REJECTED
            </span>

            <h1 className="mt-4 text-2xl font-bold text-[#4B3932]">
              Organization Verification Rejected
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
              Your organization verification request was rejected. Please update the required
              information and resubmit your organization for review.
            </p>
          </div>
        </div>
      );

    case "SUSPENDED":
      return (
        <div className="flex min-h-[70vh] items-center justify-center px-6 py-10">
          <div className="w-full max-w-lg rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
              <ShieldAlert size={30} />
            </div>

            <span className="mt-6 inline-flex rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600">
              ACCOUNT SUSPENDED
            </span>

            <h1 className="mt-4 text-2xl font-bold text-[#4B3932]">Organization Suspended</h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500">
              Your organization has been suspended and access to ResolveHub is currently
              unavailable.
            </p>

            <div className="mt-6 rounded-2xl bg-red-50 p-4 text-left">
              <div className="flex items-start gap-3">
                <ShieldAlert size={19} className="mt-0.5 shrink-0 text-red-500" />

                <p className="text-sm leading-6 text-red-700">
                  Please contact your administrator if you believe this suspension was made in
                  error.
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    case "ACTIVE":
      return <div className="relative">{children}</div>;

    default:
      return (
        <div className="flex min-h-[60vh] items-center justify-center px-6">
          <div className="text-center">
            <CheckCircle2 size={32} className="mx-auto text-[#4B3932]" />

            <h2 className="mt-4 text-lg font-bold text-[#4B3932]">
              Organization status unavailable
            </h2>
          </div>
        </div>
      );
  }
}
