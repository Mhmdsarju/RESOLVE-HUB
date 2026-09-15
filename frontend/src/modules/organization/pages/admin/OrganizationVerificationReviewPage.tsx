import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Clock3,
  Globe,
  MapPin,
  Phone,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useOrganizationVerificationDetails } from "../../hooks/useOrganizationVerificationDetails";
import { useApproveOrganizationVerification } from "../../hooks/useApproveOrganizationVerification";
import { useRejectOrganizationVerification } from "../../hooks/useRejectOrganizationVerification";

export default function OrganizationVerificationReviewPage() {
  const navigate = useNavigate();

  const { organizationId } = useParams<{ organizationId: string }>();

  const [reason, setReason] = useState("");
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const { data, isLoading, isError } = useOrganizationVerificationDetails(organizationId!);

  const approveMutation = useApproveOrganizationVerification();

  const rejectMutation = useRejectOrganizationVerification();

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF6F0] px-4">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#E7DDD3] border-t-[#4B3932]" />

          <p className="mt-4 text-sm font-medium text-stone-500">Loading verification details...</p>
        </div>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF6F0] px-4">
        <div className="w-full max-w-md rounded-3xl border border-[#E7DDD3] bg-white p-8 text-center shadow-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <XCircle size={26} />
          </div>

          <h1 className="mt-5 text-xl font-bold text-[#4B3932]">Unable to load verification</h1>

          <p className="mt-2 text-sm leading-6 text-stone-500">
            We couldn't load the organization verification details.
          </p>

          <button
            type="button"
            onClick={() => navigate("/organizations")}
            className="mt-6 rounded-xl bg-[#4B3932] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3B2E29]"
          >
            Back to Organizations
          </button>
        </div>
      </main>
    );
  }

  const { organization, verification } = data;

  const handleApprove = () => {
    setShowApproveModal(true);
  };

  const confirmApprove = () => {
    if (!organizationId) {
      return;
    }

    approveMutation.mutate(organizationId, {
      onSuccess: () => {
        setShowApproveModal(false);
        navigate("/organizations");
      },
    });
  };

  const handleReject = () => {
    if (!organizationId || !reason.trim()) {
      return;
    }

    rejectMutation.mutate(
      {
        organizationId,
        reason: reason.trim(),
      },
      {
        onSuccess: () => {
          setShowRejectModal(false);
          setReason("");
          navigate("/organizations");
        },
      },
    );
  };

  const isProcessing = approveMutation.isPending || rejectMutation.isPending;

  return (
    <main className="min-h-screen bg-[#FAF6F0] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6">
          <button
            type="button"
            onClick={() => navigate("/organizations")}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-[#4B3932] transition hover:bg-white"
          >
            <ArrowLeft size={17} />
            Back to Organizations
          </button>
        </div>

        <div className="mb-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F0E7D5] text-[#4B3932]">
                <Building2 size={27} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-stone-400">
                  Organization Verification
                </p>

                <h1 className="mt-1 text-2xl font-bold text-[#4B3932] sm:text-3xl">
                  {organization.name}
                </h1>

                <p className="mt-1 text-sm text-stone-500">
                  Review the organization details before making a decision.
                </p>
              </div>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-xs font-bold text-amber-700">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              {verification.status}
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-[#E7DDD3] bg-white p-6 shadow-sm sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0E7D5] text-[#4B3932]">
                  <Building2 size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#4B3932]">Organization Details</h2>

                  <p className="text-xs text-stone-500">
                    Basic information about the organization.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <DetailItem label="Organization Name" value={organization.name} />

                <DetailItem label="Industry" value={organization.industry} />

                <DetailItem label="Company Size" value={organization.companySize} />

                <DetailItem label="Website" value={organization.website} />

                <div className="sm:col-span-2">
                  <DetailItem label="Description" value={organization.description} />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-[#E7DDD3] bg-white p-6 shadow-sm sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F0E7D5] text-[#4B3932]">
                  <Globe size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#4B3932]">Contact & Location</h2>

                  <p className="text-xs text-stone-500">
                    Organization contact and location information.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <DetailItem label="Phone" value={organization.phone} icon={<Phone size={15} />} />

                <DetailItem label="Country" value={organization.country} />

                <DetailItem label="State" value={organization.state} />

                <DetailItem label="City" value={organization.city} icon={<MapPin size={15} />} />

                <div className="sm:col-span-2">
                  <DetailItem label="Address" value={organization.address} />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-[#E7DDD3] bg-white p-6 shadow-sm sm:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#FAF6F0] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#4B3932] shadow-sm">
                      <Clock3 size={19} />
                    </div>

                    <div>
                      <p className="text-xs text-stone-400">Submitted</p>

                      <p className="mt-1 text-sm font-bold text-[#4B3932]">
                        {verification.submittedAt
                          ? new Date(verification.submittedAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#FAF6F0] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#4B3932] shadow-sm">
                      <Users size={19} />
                    </div>

                    <div>
                      <p className="text-xs text-stone-400">Company Size</p>

                      <p className="mt-1 text-sm font-bold text-[#4B3932]">
                        {organization.companySize || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-6 lg:self-start">
            <div className="overflow-hidden rounded-3xl border border-[#E7DDD3] bg-white shadow-sm">
              <div className="bg-[#4B3932] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/50">
                  Admin Decision
                </p>

                <h2 className="mt-2 text-xl font-bold text-white">Review Request</h2>

                <p className="mt-2 text-sm leading-6 text-white/60">
                  Choose whether this organization should receive access to the ResolveHub
                  workspace.
                </p>
              </div>

              <div className="space-y-3 p-5">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleApprove}
                  className="group flex min-h-28 w-full flex-col items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 px-5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-100 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <CheckCircle2 size={21} />
                  </div>

                  <span className="mt-3 text-sm font-bold text-emerald-800">
                    Approve Organization
                  </span>

                  <span className="mt-1 text-[11px] text-emerald-700/70">
                    Grant workspace access
                  </span>
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => setShowRejectModal(true)}
                  className="group flex min-h-28 w-full flex-col items-center justify-center rounded-2xl border border-red-100 bg-red-50 px-5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-100 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-red-600 shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <XCircle size={21} />
                  </div>

                  <span className="mt-3 text-sm font-bold text-red-800">Reject Organization</span>

                  <span className="mt-1 text-[11px] text-red-700/70">Request changes</span>
                </button>
              </div>

              <div className="border-t border-[#E7DDD3] px-5 py-4">
                <p className="text-center text-xs leading-5 text-stone-400">
                  Review all submitted information before making your decision.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {showApproveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2F231F]/45 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-[#E7DDD3] bg-white shadow-2xl">
            <div className="bg-[#4B3932] px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                    <CheckCircle2 size={21} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                      Confirmation
                    </p>

                    <h2 className="mt-0.5 text-lg font-bold text-white">Approve Organization</h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowApproveModal(false)}
                  disabled={approveMutation.isPending}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-white/50 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm leading-6 text-stone-500">
                Are you sure you want to approve{" "}
                <span className="font-semibold text-[#4B3932]">{organization.name}</span>? This will
                activate the organization and grant access to the ResolveHub workspace.
              </p>

              <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />

                  <div>
                    <p className="text-sm font-semibold text-emerald-800">
                      Workspace access will be enabled
                    </p>

                    <p className="mt-1 text-xs leading-5 text-emerald-700/75">
                      The organization administrator will be able to access the ResolveHub workspace
                      after approval.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowApproveModal(false)}
                  disabled={approveMutation.isPending}
                  className="flex-1 rounded-xl border border-[#E7DDD3] px-5 py-3 text-sm font-semibold text-[#4B3932] transition hover:bg-[#FAF6F0] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={confirmApprove}
                  disabled={approveMutation.isPending}
                  className="flex-1 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {approveMutation.isPending ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Approving...
                    </span>
                  ) : (
                    "Confirm Approval"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2F231F]/45 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-[#E7DDD3] bg-white shadow-2xl">
            <div className="bg-[#4B3932] px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/15 text-red-300">
                    <XCircle size={21} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                      Verification
                    </p>

                    <h2 className="mt-0.5 text-lg font-bold text-white">Reject Organization</h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowRejectModal(false)}
                  disabled={rejectMutation.isPending}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-white/50 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm leading-6 text-stone-500">
                Provide a clear reason so the organization administrator knows what needs to be
                corrected.
              </p>

              <textarea
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                rows={5}
                placeholder="Enter rejection reason..."
                className="mt-5 w-full resize-none rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] px-4 py-3 text-sm text-[#4B3932] outline-none transition placeholder:text-stone-400 focus:border-[#4B3932] focus:bg-white focus:ring-4 focus:ring-[#4B3932]/10"
              />

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowRejectModal(false)}
                  disabled={rejectMutation.isPending}
                  className="flex-1 rounded-xl border border-[#E7DDD3] px-5 py-3 text-sm font-semibold text-[#4B3932] transition hover:bg-[#FAF6F0] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleReject}
                  disabled={rejectMutation.isPending || !reason.trim()}
                  className="flex-1 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {rejectMutation.isPending ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Rejecting...
                    </span>
                  ) : (
                    "Confirm Rejection"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function DetailItem({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string | null;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-4">
      <div className="flex items-center gap-2">
        {icon && <span className="text-stone-400">{icon}</span>}

        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-stone-400">{label}</p>
      </div>

      <p className="mt-2 wrap-break-words text-sm font-semibold leading-6 text-[#4B3932]">
        {value?.trim() || "Not provided"}
      </p>
    </div>
  );
}
