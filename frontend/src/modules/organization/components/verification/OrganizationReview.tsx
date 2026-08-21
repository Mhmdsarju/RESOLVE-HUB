import { Building2, CheckCircle2, Globe2 } from "lucide-react";

import type { OrganizationProfileFormData } from "../../validations/organization.schema";

interface OrganizationReviewProps {
  data: OrganizationProfileFormData;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

function ReviewItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-4">
      <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400">{label}</p>

      <p className="mt-1.5 wrap-break-words text-sm font-semibold text-[#4B3932]">
        {value?.trim() || "Not provided"}
      </p>
    </div>
  );
}

export default function OrganizationReview({
  data,
  onBack,
  onSubmit,
  isSubmitting,
}: OrganizationReviewProps) {
  return (
    <section className="w-full rounded-3xl border border-[#E7DDD3] bg-white p-6 shadow-xl sm:p-8">
      <div className="mb-7 flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F0E7D5] text-[#4B3932]">
          <CheckCircle2 size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#4B3932]">Review & Submit</h2>

          <p className="mt-1 text-sm text-stone-500">Check your information before submitting.</p>
        </div>
      </div>

      <div className="space-y-7">
        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <Building2 size={18} className="text-[#4B3932]" />

            <h3 className="font-bold text-[#4B3932]">Organization Details</h3>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <ReviewItem label="Organization Name" value={data.name} />

            <ReviewItem label="Industry" value={data.industry} />

            <ReviewItem label="Company Size" value={data.companySize} />

            <ReviewItem label="Description" value={data.description} />
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <Globe2 size={18} className="text-[#4B3932]" />

            <h3 className="font-bold text-[#4B3932]">Contact & Location</h3>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <ReviewItem label="Website" value={data.website} />

            <ReviewItem label="Phone" value={data.phone} />

            <ReviewItem label="Country" value={data.country} />

            <ReviewItem label="State" value={data.state} />

            <ReviewItem label="City" value={data.city} />

            <ReviewItem label="Address" value={data.address} />
          </div>
        </div>

        <div className="rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#4B3932] shadow-sm">
              <CheckCircle2 size={19} />
            </div>

            <div>
              <h3 className="font-semibold text-[#4B3932]">Ready for verification</h3>

              <p className="mt-1 text-sm leading-6 text-stone-500">
                Your organization will enter the verification queue after submission. Workspace
                access will be available once a Super Admin approves your organization.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-7 flex justify-between border-t border-[#E7DDD3] pt-6">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="
            rounded-xl
            border
            border-[#E7DDD3]
            px-6
            py-3
            text-sm
            font-semibold
            text-[#4B3932]
            transition
            hover:bg-[#FAF6F0]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          Back
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-[#4B3932]
            px-7
            py-3
            text-sm
            font-semibold
            text-white
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-[#3B2E29]
            hover:shadow-lg
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Submitting...
            </>
          ) : (
            <>
              <CheckCircle2 size={18} />
              Submit for Verification
            </>
          )}
        </button>
      </div>
    </section>
  );
}
