import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthInput from "../components/AuthInput";
import PasswordInput from "../components/PasswordInput";
import SelectInput from "../components/SelectInput";

import { companySizes, industries } from "../constants/register";

import { registerSchema } from "../validations/register.schema";
import type { RegisterFormData } from "../validations/register.schema";

import { useRegister } from "../hooks/useRegister";

export default function OrganizationRegisterPage() {
  const navigate = useNavigate();

  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      organizationName: "",
      companyDomain: "",
      companySize: "",
      industry: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(
      {
        organizationName: data.organizationName,
        companyDomain: data.companyDomain,
        companySize: data.companySize,
        industry: data.industry,
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          navigate("/organization/verify-signup-otp", {
            state: {
              email: data.email,
            },
          });
        },
      },
    );
  };

  return (
    <main className="min-h-screen bg-[#FAF6F0] px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl bg-white p-6 shadow-xl md:p-8">
          {/* Header */}

          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-[#4B3932] md:text-4xl">
              Register Your Organization
            </h1>

            <p className="mt-3 text-stone-500">
              Get your enterprise war rooms up and running today.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Organization Information */}

            <section>
              <h2 className="mb-6 text-xl font-semibold text-[#4B3932]">
                Organization Information
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                <AuthInput
                  label="Organization Name"
                  placeholder="Acme Corporation"
                  error={errors.organizationName?.message}
                  {...register("organizationName")}
                />

                <AuthInput
                  label="Company Domain"
                  placeholder="acme.com"
                  error={errors.companyDomain?.message}
                  {...register("companyDomain")}
                />

                <SelectInput
                  label="Company Size"
                  options={companySizes}
                  error={errors.companySize?.message}
                  {...register("companySize")}
                />

                <SelectInput
                  label="Industry"
                  options={industries}
                  error={errors.industry?.message}
                  {...register("industry")}
                />
              </div>
            </section>

            <div className="border-t border-[#E7DDD3]" />

            {/* Administrator */}

            <section>
              <h2 className="mb-6 text-xl font-semibold text-[#4B3932]">Administrator Account</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <AuthInput
                  label="Admin Name"
                  placeholder="John Doe"
                  error={errors.name?.message}
                  {...register("name")}
                />

                <AuthInput
                  type="email"
                  label="Work Email"
                  placeholder="john@acme.com"
                  error={errors.email?.message}
                  {...register("email")}
                />

                <PasswordInput
                  label="Password"
                  placeholder="Minimum 8 characters"
                  error={errors.password?.message}
                  {...register("password")}
                />

                <PasswordInput
                  label="Confirm Password"
                  placeholder="Repeat password"
                  error={errors.confirmPassword?.message}
                  {...register("confirmPassword")}
                />
              </div>
            </section>
            {/* Terms & Conditions */}

            <div>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-[#E7DDD3] accent-[#4B3932]"
                  {...register("acceptTerms")}
                />

                <span className="text-sm leading-6 text-stone-600">
                  I agree to the{" "}
                  <Link to="/terms" className="font-medium text-[#4B3932] hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="font-medium text-[#4B3932] hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              {errors.acceptTerms && (
                <p className="mt-2 text-sm text-red-500">{errors.acceptTerms.message}</p>
              )}
            </div>

            {/* Submit Button */}

            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="
                w-full
                rounded-xl
                bg-[#4B3932]
                py-4
                text-base
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#3B2E29]
                hover:shadow-xl
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              {registerMutation.isPending ? "Creating Workspace..." : "Create Workspace"}
            </button>

            {/* Footer */}

            <div className="text-center text-sm text-stone-500">
              Already have an organization workspace?
              <Link
                to="/organization/login"
                className="ml-2 font-semibold text-[#4B3932] hover:underline"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
