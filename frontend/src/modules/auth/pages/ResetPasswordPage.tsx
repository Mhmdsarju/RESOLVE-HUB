import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PasswordInput from "../components/PasswordInput";

import { resetPasswordSchema,type ResetPasswordFormData,} from "../validations/resetPassword.schema";

import { useResetPassword } from "../hooks/useResetPassword";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const location = useLocation();

  const email = location.state?.email ?? "";

  const resetToken = location.state?.resetToken ?? "";

  const resetPasswordMutation = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),

    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    await resetPasswordMutation.mutateAsync({
      email,
      resetToken,
      password: data.password,
    });

    navigate("/organization/login");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF6F0] px-4 py-8">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        {/* Header */}

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#4B3932]">Reset Password</h1>

          <p className="mt-3 text-stone-500">Create a new password for your account.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <PasswordInput
            label="New Password"
            placeholder="Enter new password"
            error={errors.password?.message}
            {...register("password")}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm new password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <button
            type="submit"
            disabled={resetPasswordMutation.isPending}
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
            {resetPasswordMutation.isPending ? "Resetting Password..." : "Reset Password"}
          </button>

          <div className="border-t border-[#E7DDD3]" />

          <div className="text-center text-sm text-stone-500">
            Remember your password?
            <button
              type="button"
              onClick={() => navigate("/organization/login")}
              className="
                ml-2
                font-semibold
                text-[#4B3932]
                hover:underline
              "
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
