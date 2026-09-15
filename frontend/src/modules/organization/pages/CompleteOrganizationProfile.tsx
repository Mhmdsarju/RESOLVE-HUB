import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle } from "lucide-react";

import {
  organizationProfileSchema,
  type OrganizationProfileFormData,
} from "../validations/organization.schema";

import { useOrganization } from "../hooks/useOrganization";
import { useUpdateOrganization } from "../hooks/useUpdateOrganization";
import { useSubmitOrganizationVerification } from "../hooks/useSubmitOrganizationVerification";
import { useOrganizationVerification } from "../hooks/useOrganizationVerification";

import OrganizationStepIndicator from "../components/verification/OrganizationStepIndicator";
import BasicOrganizationForm from "../components/verification/BasicOrganizationForm";
import OrganizationContactForm from "../components/verification/OrganizationContactForm";
import OrganizationReview from "../components/verification/OrganizationReview";
import VerificationSubmitted from "../components/verification/VerificationSubmitted";

export default function CompleteOrganizationProfile() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const {
    data: organization,
    isLoading: organizationLoading,
    isError: organizationError,
  } = useOrganization();

  const { data: verification, isLoading: verificationLoading } = useOrganizationVerification();

  const updateOrganization = useUpdateOrganization();
  const submitVerification = useSubmitOrganizationVerification();

  const {
    register,
    trigger,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<OrganizationProfileFormData>({
    resolver: zodResolver(organizationProfileSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      industry: "",
      companySize: "",
      website: "",
      description: "",
      phone: "",
      country: "",
      state: "",
      city: "",
      address: "",
    },
  });

  useEffect(() => {
    if (!organization) {
      return;
    }

    reset({
      name: organization.name ?? "",
      industry: organization.industry ?? "",
      companySize: organization.companySize ?? "",
      website: organization.website ?? "",
      description: organization.description ?? "",
      phone: organization.phone ?? "",
      country: organization.country ?? "",
      state: organization.state ?? "",
      city: organization.city ?? "",
      address: organization.address ?? "",
    });
  }, [organization, reset]);

  useEffect(() => {
    if (organization?.status === "ACTIVE") {
      navigate("/dashboard", { replace: true });
    }
  }, [organization?.status, navigate]);

  const formData = watch();

  const handleBasicNext = async () => {
    const isValid = await trigger(["name", "industry", "companySize", "description"]);

    if (isValid) {
      setStep(2);
    }
  };

  const handleContactNext = async () => {
    const isValid = await trigger(["website", "phone", "country", "state", "city", "address"]);

    if (isValid) {
      setStep(3);
    }
  };

  const handleFinalSubmit = async (data: OrganizationProfileFormData) => {
    await updateOrganization.mutateAsync(data);
    await submitVerification.mutateAsync();
  };

  if (organizationLoading || verificationLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF6F0] px-4">
        <div className="rounded-3xl border border-[#E7DDD3] bg-white px-10 py-9 text-center shadow-xl">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#E7DDD3] border-t-[#4B3932]" />

          <p className="mt-4 text-sm font-semibold text-[#4B3932]">Loading organization...</p>

          <p className="mt-1 text-xs text-stone-400">Preparing your organization profile</p>
        </div>
      </main>
    );
  }

  if (organizationError || !organization) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF6F0] px-4">
        <div className="w-full max-w-md rounded-3xl border border-[#E7DDD3] bg-white p-10 text-center shadow-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0E7D5] text-[#4B3932]">
            <AlertTriangle size={25} />
          </div>

          <h1 className="mt-5 text-xl font-bold text-[#4B3932]">Unable to load organization</h1>

          <p className="mt-2 text-sm leading-6 text-stone-500">
            We couldn't load your organization details. Please try again.
          </p>
        </div>
      </main>
    );
  }

  if (organization.status === "ACTIVE") {
    return null;
  }

  if (organization.status === "PENDING_VERIFICATION") {
    return <VerificationSubmitted submittedAt={verification?.submittedAt} />;
  }

  const isRejected = organization.status === "REJECTED" && Boolean(verification?.rejectionReason);

  return (
    <main className="min-h-screen bg-[#FAF6F0] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8">
          <div className="flex flex-col gap-3">
            <div className="inline-flex w-fit items-center rounded-full border border-[#E7DDD3] bg-[#F0E7D5] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#4B3932]">
              Organization Setup
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[#4B3932] sm:text-4xl">
              Complete your organization
            </h1>

            <p className="max-w-2xl text-sm leading-6 text-stone-500 sm:text-base">
              Provide your organization information carefully. Once submitted, our administration
              team will review your organization before workspace access is granted.
            </p>
          </div>
        </div>

        <div
          className={`
            grid items-start gap-6
            ${
              isRejected
                ? "lg:grid-cols-[250px_minmax(0,1fr)_280px]"
                : "lg:grid-cols-[minmax(0,1fr)_280px]"
            }
          `}
        >
          {isRejected && (
            <aside className="order-2 lg:order-1 lg:sticky lg:top-6">
              <div className="relative overflow-hidden rounded-3xl border border-red-200 bg-white shadow-lg shadow-red-900/5">
                <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-red-400 via-red-500 to-red-300" />

                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-red-100/60 blur-2xl" />

                <div className="relative p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-500 ring-1 ring-red-100">
                      <AlertTriangle size={20} />
                    </div>

                    <div className="min-w-0">
                      <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-red-500">
                        Action Required
                      </span>

                      <h2 className="mt-2 text-base font-bold text-red-900">
                        Verification Rejected
                      </h2>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-red-400">
                      Why rejected?
                    </p>

                    <div className="mt-3 rounded-2xl border border-red-100 bg-red-50/70 p-4">
                      <p className="wrap-break-words text-sm leading-6 text-red-800">
                        {verification?.rejectionReason}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-red-100 pt-5">
                    <p className="text-xs leading-5 text-red-600/80">
                      Update the required information and submit your organization again for
                      verification.
                    </p>
                  </div>
                </div>

                <div className="h-1 bg-linear-to-r from-red-100 via-red-200 to-transparent" />
              </div>
            </aside>
          )}

          <div className="order-1 min-w-0 lg:order-2">
            <div className="overflow-hidden rounded-3xl border border-[#E7DDD3] bg-white shadow-xl shadow-[#4B3932]/5">
              <div className="border-b border-[#E7DDD3] bg-linear-to-r from-white via-[#FFFCF8] to-[#FAF6F0] px-6 py-5 sm:px-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-stone-400">
                      Step {step} of 3
                    </p>

                    <h2 className="mt-1 text-lg font-bold text-[#4B3932]">
                      {step === 1
                        ? "Organization Information"
                        : step === 2
                          ? "Contact & Location"
                          : "Review & Submit"}
                    </h2>
                  </div>

                  <div className="hidden rounded-full bg-[#F0E7D5] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#4B3932] sm:block">
                    Verification
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                {step === 1 && (
                  <BasicOrganizationForm
                    register={register}
                    errors={errors}
                    onNext={handleBasicNext}
                  />
                )}

                {step === 2 && (
                  <OrganizationContactForm
                    register={register}
                    errors={errors}
                    onBack={() => setStep(1)}
                    onNext={handleContactNext}
                  />
                )}

                {step === 3 && (
                  <OrganizationReview
                    data={formData}
                    onBack={() => setStep(2)}
                    onSubmit={handleSubmit(handleFinalSubmit)}
                    isSubmitting={updateOrganization.isPending || submitVerification.isPending}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="order-3 lg:order-3 lg:sticky lg:top-6">
            <OrganizationStepIndicator currentStep={step} />
          </div>
        </div>
      </div>
    </main>
  );
}
