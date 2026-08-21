import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { useAcceptTeamInvitation } from "../hooks/useAcceptTeamInvitation";
import {
  acceptInvitationSchema,
  type AcceptInvitationFormValues,
} from "../validations/acceptInvitation.schema";

export default function AcceptInvitationPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

      navigate("/dashboard");
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
    </main>
  );
}
