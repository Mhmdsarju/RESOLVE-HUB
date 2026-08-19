import { CheckCircle2, Clock3, FileCheck2, ShieldCheck, Sparkles } from "lucide-react";

interface VerificationSubmittedProps {
  submittedAt?: string | null;
}

export default function VerificationSubmitted({ submittedAt }: VerificationSubmittedProps) {
  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-[#F5EFE6] px-4 py-4 sm:px-6">
      <div className="relative w-full max-w-3xl">
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#E7D8C8]/50 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#E3D0BC]/40 blur-3xl" />

        <div className="relative overflow-hidden rounded-[28px] border border-[#E2D5C7] bg-[#FFFDFC] shadow-[0_20px_60px_rgba(75,57,50,0.12)]">
          <div className="relative overflow-hidden bg-[#4B3932] px-6 py-6 text-center sm:px-8 sm:py-7">
            <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[#6A5348]/40 blur-2xl" />

            <div className="absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-[#3B2E29]/60 blur-2xl" />

            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#F0E7D5]/10 text-[#F0E7D5]">
                <CheckCircle2 size={30} strokeWidth={1.8} />
              </div>

              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#F0E7D5]/20 bg-[#F0E7D5]/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#F0E7D5]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D7B98C]" />
                Verification Requested
              </div>

              <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                You're All Set
              </h1>

              <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-[#E8DDD4] sm:text-sm">
                Your organization has been successfully submitted and is waiting for administrative
                review.
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0E7D5] text-[#4B3932]">
                <Sparkles size={17} />
              </div>

              <div>
                <p className="text-sm font-bold text-[#4B3932]">Verification Progress</p>

                <p className="text-[11px] text-stone-500">
                  Your organization is moving through the approval process.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#E5D9CC] bg-[#FAF6F0] p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#4B3932] shadow-sm">
                  <FileCheck2 size={18} />
                </div>

                <p className="mt-3 text-sm font-bold text-[#4B3932]">Submitted</p>

                <p className="mt-1 text-[11px] leading-4 text-stone-500">
                  Organization profile received
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#4B3932] text-white">
                    <CheckCircle2 size={10} />
                  </span>

                  <span className="text-[10px] font-semibold text-[#4B3932]">Completed</span>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E5D9CC] bg-[#FAF6F0] p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0E7D5] text-[#4B3932] shadow-sm">
                  <Clock3 size={18} />
                </div>

                <p className="mt-3 text-sm font-bold text-[#4B3932]">Under Review</p>

                <p className="mt-1 text-[11px] leading-4 text-stone-500">
                  Administration team is reviewing
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#B18A5A]" />

                  <span className="text-[10px] font-semibold text-[#8A6A43]">In progress</span>
                </div>
              </div>

              <div className="rounded-2xl border border-[#E5D9CC] bg-[#FAF6F0] p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-stone-400 shadow-sm">
                  <ShieldCheck size={18} />
                </div>

                <p className="mt-3 text-sm font-bold text-[#4B3932]">Workspace</p>

                <p className="mt-1 text-[11px] leading-4 text-stone-500">
                  Available after approval
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-stone-300" />

                  <span className="text-[10px] font-semibold text-stone-400">Waiting</span>
                </div>
              </div>
            </div>

            {submittedAt && (
              <div className="mt-3 flex items-center justify-between rounded-2xl border border-[#E5D9CC] bg-white px-4 py-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Requested on
                </span>

                <span className="text-xs font-bold text-[#4B3932]">
                  {new Date(submittedAt).toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}

            <div className="relative mt-3 overflow-hidden rounded-2xl border border-[#E5D9CC] bg-[#F0E7D5]/60 px-4 py-3">
              <div className="relative flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#4B3932] shadow-sm">
                  <Clock3 size={17} />
                </div>

                <div>
                  <p className="text-xs font-bold text-[#4B3932]">What happens next?</p>

                  <p className="mt-0.5 text-[11px] leading-5 text-stone-600">
                    Our administration team will review your organization. Once approved, your
                    ResolveHub workspace will become available automatically.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="h-px flex-1 bg-[#E7DDD3]" />

              <p className="px-2 text-[8px] font-bold uppercase tracking-[0.16em] text-stone-400">
                ResolveHub Verification
              </p>

              <div className="h-px flex-1 bg-[#E7DDD3]" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
