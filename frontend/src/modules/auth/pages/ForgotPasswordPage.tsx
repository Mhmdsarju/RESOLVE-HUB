import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthInput from "../components/AuthInput";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../validations/forgotPassword.schema";

import { useForgotPassword } from "../hooks/useForgotPassword";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const forgotPasswordMutation = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),

    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await forgotPasswordMutation.mutateAsync(data);

    navigate("/forgot-password/verify-otp", {
      state: {
        email: data.email,
      },
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF6F0] px-4 py-8">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#4B3932]">Forgot Password</h1>

          <p className="mt-3 text-stone-500">
            Enter your work email and we'll send you a verification code.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <AuthInput
            type="email"
            label="Work Email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <button
            type="submit"
            disabled={forgotPasswordMutation.isPending}
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
            {forgotPasswordMutation.isPending ? "Sending OTP..." : "Send OTP"}
          </button>

          <div className="border-t border-[#E7DDD3]" />

          <div className="text-center text-sm text-stone-500">
            Remember your password?
            <Link
              to="/organization/login"
              className="
                ml-2
                font-semibold
                text-[#4B3932]
                hover:underline
              "
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
