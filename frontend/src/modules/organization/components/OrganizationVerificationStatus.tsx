import { CheckCircle2, Clock3, FileCheck2, ShieldCheck, XCircle } from "lucide-react";

import { useOrganization } from "../hooks/useOrganization";
import { useOrganizationVerification } from "../hooks/useOrganizationVerification";
import { useSubmitOrganizationVerification } from "../hooks/useSubmitOrganizationVerification";

export default function OrganizationVerificationStatus() {
  const { data: organization, isLoading: organizationLoading } = useOrganization();

  const { data: verification, isLoading: verificationLoading } = useOrganizationVerification();

  const submitVerification = useSubmitOrganizationVerification();

  if (organizationLoading || verificationLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-linear-to-br from-[#EDEAE3] via-[#F5F0E8] to-[#F0E7D5] px-4">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-2xl border-4 border-[#E7DDD3] border-t-[#4B3932]" />

          <p className="mt-4 text-sm font-medium text-[#4B3932]">Loading verification status...</p>
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-linear-to-br from-[#EDEAE3] via-[#F5F0E8] to-[#F0E7D5] px-4">
        <div className="w-full max-w-md rounded-3xl border border-[#E7DDD3] bg-white p-8 text-center shadow-[0_20px_60px_rgba(75,57,50,0.10)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <XCircle size={30} />
          </div>

          <h1 className="mt-5 text-xl font-bold text-[#4B3932]">Organization Not Found</h1>

          <p className="mt-2 text-sm leading-6 text-stone-500">
            We couldn't load your organization details. Please try again.
          </p>
        </div>
      </div>
    );
  }

  if (!verification) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-linear-to-br from-[#EDEAE3] via-[#F5F0E8] to-[#F0E7D5] px-4 py-10">
        <div className="w-full max-w-2xl rounded-3xl border border-[#E7DDD3] bg-white p-8 text-center shadow-[0_20px_60px_rgba(75,57,50,0.10)] sm:p-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#F0E7D5] text-[#4B3932]">
            <FileCheck2 size={38} />
          </div>

          <div className="mt-6 inline-flex rounded-full bg-[#F0E7D5] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#4B3932]">
            Setup Required
          </div>

          <h1 className="mt-5 text-3xl font-bold text-[#4B3932]">Verification Not Submitted</h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-stone-500">
            Your organization verification request hasn't been submitted yet. Complete your
            organization profile and submit it for review.
          </p>
        </div>
      </div>
    );
  }

  if (verification.status === "PENDING") {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-linear-to-br from-[#EDEAE3] via-[#F5F0E8] to-[#F0E7D5] px-4 py-8 sm:py-10">
        <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-[#E7DDD3] bg-white shadow-[0_24px_70px_rgba(75,57,50,0.12)]">
          <div className="bg-linear-to-br from-[#4B3932] via-[#59443B] to-[#3B2E29] px-6 py-10 text-center sm:px-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-white ring-1 ring-white/10">
              <Clock3 size={40} />
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold tracking-wider text-white backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-300" />
              PENDING REVIEW
            </div>

            <h1 className="mt-5 text-3xl font-bold text-white">Verification Pending</h1>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-white/65">
              Your organization verification request is currently being reviewed by the ResolveHub
              administration team.
            </p>
          </div>

          <div className="p-5 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="group rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#D8C9BD] hover:shadow-md">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#4B3932] shadow-sm">
                  <CheckCircle2 size={21} />
                </div>

                <p className="mt-3 text-sm font-semibold text-[#4B3932]">Submitted</p>

                <p className="mt-1 text-xs text-stone-500">Request received</p>
              </div>

              <div className="group rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#D8C9BD] hover:shadow-md">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#4B3932] text-white shadow-sm">
                  <Clock3 size={21} />
                </div>

                <p className="mt-3 text-sm font-semibold text-[#4B3932]">Under Review</p>

                <p className="mt-1 text-xs text-stone-500">Admin review in progress</p>
              </div>

              <div className="group rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#D8C9BD] hover:shadow-md">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white text-stone-300 shadow-sm">
                  <ShieldCheck size={21} />
                </div>

                <p className="mt-3 text-sm font-semibold text-stone-400">Workspace</p>

                <p className="mt-1 text-xs text-stone-400">Available after approval</p>
              </div>
            </div>

            {verification.submittedAt && (
              <div className="mt-5 flex items-center justify-between rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] px-5 py-4">
                <span className="text-sm text-stone-500">Submitted on</span>

                <span className="text-sm font-semibold text-[#4B3932]">
                  {new Date(verification.submittedAt).toLocaleDateString()}
                </span>
              </div>
            )}

            <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 p-5">
              <div className="flex items-start gap-3">
                <Clock3 size={20} className="mt-0.5 shrink-0 text-amber-600" />

                <div>
                  <p className="text-sm font-semibold text-amber-800">What happens next?</p>

                  <p className="mt-1 text-sm leading-6 text-amber-700/80">
                    The administration team will review your organization information. Your
                    ResolveHub workspace will become available once your organization is approved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (verification.status === "REJECTED") {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-linear-to-br from-[#EDEAE3] via-[#F5F0E8] to-[#F0E7D5] px-4 py-10">
        <div className="w-full max-w-2xl rounded-3xl border border-[#E7DDD3] bg-white p-6 shadow-[0_24px_70px_rgba(75,57,50,0.12)] sm:p-8">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-500">
              <XCircle size={40} />
            </div>

            <div className="mt-6 inline-flex rounded-full bg-red-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-600">
              Verification Rejected
            </div>

            <h1 className="mt-5 text-3xl font-bold text-[#4B3932]">Verification Rejected</h1>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-stone-500">
              Your organization verification request was not approved. Please review the reason
              below and update your information.
            </p>
          </div>

          {verification.rejectionReason && (
            <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-red-500">
                Rejection Reason
              </p>

              <p className="mt-3 text-sm leading-6 text-red-800">{verification.rejectionReason}</p>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => submitVerification.mutate()}
              disabled={submitVerification.isPending}
              className="rounded-xl bg-[#4B3932] px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3B2E29] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitVerification.isPending ? "Resubmitting..." : "Resubmit for Verification"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (verification.status === "APPROVED") {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-linear-to-br from-[#EDEAE3] via-[#F5F0E8] to-[#F0E7D5] px-4 py-10">
        <div className="w-full max-w-2xl rounded-3xl border border-[#E7DDD3] bg-white p-8 text-center shadow-[0_24px_70px_rgba(75,57,50,0.12)] sm:p-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600">
            <ShieldCheck size={42} />
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <CheckCircle2 size={14} />
            VERIFIED
          </div>

          <h1 className="mt-5 text-3xl font-bold text-[#4B3932]">Organization Verified</h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-stone-500">
            Your organization has been successfully verified. Your ResolveHub workspace is ready to
            use.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
