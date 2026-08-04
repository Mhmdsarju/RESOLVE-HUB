import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff, X } from "lucide-react";

import { useChangePassword } from "../hooks/useChangePassword";
import type { ChangePasswordDto } from "../types/changePassword";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

type ChangePasswordForm = ChangePasswordDto & {
  confirmPassword: string;
};

export function ChangePasswordModal({
  open,
  onClose,
}: ChangePasswordModalProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordForm>();

  const newPassword = watch("newPassword");

  const changePasswordMutation = useChangePassword();

  async function onSubmit(data: ChangePasswordForm) {
    const {...payload } = data;

    try {
      const response = await changePasswordMutation.mutateAsync(payload);

      toast.success(response.message || "Password changed successfully.");

      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={() => {
            reset();
            onClose();
          }}
          className="absolute right-4 top-4 rounded-full p-1 text-stone-500 transition hover:bg-stone-100"
        >
          <X size={20} />
        </button>

        <div className="border-b border-stone-200 px-6 py-5">
          <h2 className="text-2xl font-bold text-[#4B3932]">
            Change Password
          </h2>

          <p className="mt-1 text-sm text-stone-500">
            Update your account password to keep your account secure.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6">
          {/* Current Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#4B3932]">
              Current Password
            </label>

            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter current password"
                {...register("currentPassword", {
                  required: "Current password is required",
                })}
                className="w-full rounded-xl border border-stone-300 px-4 py-3 pr-12 outline-none transition focus:border-[#4B3932]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowCurrentPassword(!showCurrentPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500"
              >
                {showCurrentPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#4B3932]">
              New Password
            </label>

            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                {...register("newPassword", {
                  required: "New password is required",
                })}
                className="w-full rounded-xl border border-stone-300 px-4 py-3 pr-12 outline-none transition focus:border-[#4B3932]"
              />

              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500"
              >
                {showNewPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#4B3932]">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
                className="w-full rounded-xl border border-stone-300 px-4 py-3 pr-12 outline-none transition focus:border-[#4B3932]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
                navigate("/forgot-password");
              }}
              className="text-sm font-medium text-[#4B3932] transition hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="rounded-xl border border-stone-300 px-5 py-2.5 font-medium text-[#4B3932] transition hover:bg-stone-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={changePasswordMutation.isPending}
              className="rounded-xl bg-[#4B3932] px-5 py-2.5 font-medium text-white transition hover:bg-[#5A463E] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {changePasswordMutation.isPending
                ? "Changing..."
                : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}