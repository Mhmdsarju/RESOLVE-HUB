import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useAcceptTeamInvitation } from "../hooks/useAcceptTeamInvitation";
import {
  acceptInvitationSchema,
  type AcceptInvitationFormValues,
} from "../validations/acceptInvitation.schema";

export default function AcceptInvitationPage() {
  const { token } = useParams<{ token: string }>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const acceptInvitationMutation = useAcceptTeamInvitation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AcceptInvitationFormValues>({
    resolver: zodResolver(acceptInvitationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleFormSubmit = async (values: AcceptInvitationFormValues) => {
    if (!token) {
      return;
    }

    try {
      await acceptInvitationMutation.mutateAsync({
        token,
        data: {
          name: values.name.trim(),
          password: values.password,
        },
      });

      setShowSuccessModal(true);

      setTimeout(() => {
        window.location.assign("/user/login");
      }, 4000);
    } catch {
      return;
    }
  };

  return (
    <main className="min-h-screen bg-[#EDEAE3] px-4 py-10">
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F0E7D5] text-xl font-bold text-[#4B3932]">
              R
            </div>

            <h1 className="mt-5 text-2xl font-bold text-[#4B3932]">Accept Team Invitation</h1>

            <p className="mt-2 text-sm leading-6 text-stone-500">
              Complete your registration to join the team as an engineer.
            </p>
          </div>

          {!token && (
            <div className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              Invalid invitation link.
            </div>
          )}

          <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-8 space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#4B3932]">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                disabled={acceptInvitationMutation.isPending}
                {...register("name")}
                className={`
                  w-full
                  rounded-xl
                  border
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  ${
                    errors.name
                      ? "border-red-300 focus:border-red-400"
                      : "border-[#E7DDD3] focus:border-[#4B3932]"
                  }
                  disabled:cursor-not-allowed
                  disabled:bg-[#FAF6F0]
                  disabled:opacity-60
                `}
              />

              {errors.name && (
                <p className="mt-1.5 text-xs font-medium text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#4B3932]">
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  disabled={acceptInvitationMutation.isPending}
                  {...register("password")}
                  className={`
                    w-full
                    rounded-xl
                    border
                    px-4
                    py-3
                    pr-12
                    text-sm
                    outline-none
                    transition
                    ${
                      errors.password
                        ? "border-red-300 focus:border-red-400"
                        : "border-[#E7DDD3] focus:border-[#4B3932]"
                    }
                    disabled:cursor-not-allowed
                    disabled:bg-[#FAF6F0]
                    disabled:opacity-60
                  `}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  disabled={acceptInvitationMutation.isPending}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    rounded-lg
                    p-1.5
                    text-stone-400
                    transition
                    hover:bg-[#FAF6F0]
                    hover:text-[#4B3932]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1.5 text-xs font-medium text-red-500">{errors.password.message}</p>
              )}

              {!errors.password && (
                <p className="mt-1.5 text-xs text-stone-400">
                  8+ characters, uppercase, lowercase, number and special character. No spaces.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-[#4B3932]"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  disabled={acceptInvitationMutation.isPending}
                  {...register("confirmPassword")}
                  className={`
                    w-full
                    rounded-xl
                    border
                    px-4
                    py-3
                    pr-12
                    text-sm
                    outline-none
                    transition
                    ${
                      errors.confirmPassword
                        ? "border-red-300 focus:border-red-400"
                        : "border-[#E7DDD3] focus:border-[#4B3932]"
                    }
                    disabled:cursor-not-allowed
                    disabled:bg-[#FAF6F0]
                    disabled:opacity-60
                  `}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((previous) => !previous)}
                  disabled={acceptInvitationMutation.isPending}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    rounded-lg
                    p-1.5
                    text-stone-400
                    transition
                    hover:bg-[#FAF6F0]
                    hover:text-[#4B3932]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                  aria-label={
                    showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs font-medium text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!token || !isValid || acceptInvitationMutation.isPending}
              className="
                w-full
                rounded-xl
                bg-[#4B3932]
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#3B2E29]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {acceptInvitationMutation.isPending ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md animate-in fade-in zoom-in-95 rounded-3xl bg-white p-8 text-center shadow-2xl duration-200">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-[#4B3932]">Registration Successful!</h2>

            <p className="mt-3 text-sm leading-6 text-stone-500">
              You are successfully registered as an engineer in the ResolveHub team.
            </p>

            <div className="mt-6 rounded-2xl border border-[#D8C4A8] bg-[#FBF6EC] p-5 text-left">
              <p className="text-sm font-bold text-[#4B3932]">Your account is ready!</p>

              <p className="mt-2 text-sm leading-6 text-stone-500">
                Please login using the{" "}
                <span className="font-semibold text-[#4B3932]">Gmail address</span> associated with
                your invitation and the{" "}
                <span className="font-semibold text-[#4B3932]">password</span> you just created.
              </p>
            </div>

            <div className="mt-6">
              <p className="text-xs font-medium text-stone-400">Redirecting to login page...</p>

              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-stone-100">
                <div className="h-full w-full origin-left animate-[shrink_4s_linear_forwards] rounded-full bg-[#4B3932]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
