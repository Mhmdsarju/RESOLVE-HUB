import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import OtpInput from "../components/OtpInput";

import {
  verifySignupOtpSchema,
  type VerifySignupOtpFormData,
} from "../validations/verifySignupOtp.schema";

import { useVerifySignupOtp } from "../hooks/useVerifySignupOtp";
import { useResendSignupOtp } from "../hooks/useResendSignupOtp";

export default function VerifySignupOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email ?? "";

  const [timer, setTimer] = useState(60);

  const verifySignupOtpMutation = useVerifySignupOtp();
  const resendSignupOtpMutation = useResendSignupOtp();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerifySignupOtpFormData>({
    resolver: zodResolver(verifySignupOtpSchema),
    defaultValues: {
      email,
      otp: "",
    },
  });

  const otp = useWatch({
    control,
    name: "otp",
  });

  useEffect(() => {
    if (!email) {
      navigate("/organization/register", {
        replace: true,
      });

      return;
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timer <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Backspace") {
        return;
      }

      const target = event.target as HTMLElement;

      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }

      event.preventDefault();
      navigate(-1);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);

  const handleResendOtp = async () => {
    await resendSignupOtpMutation.mutateAsync({
      email,
    });

    setTimer(60);
  };

  const onSubmit = async (data: VerifySignupOtpFormData) => {
    await verifySignupOtpMutation.mutateAsync(data);

    navigate("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#EDEAE3] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#4B3932]">Verify Your Email</h1>

          <p className="mt-3 text-sm leading-6 text-stone-500">
            We've sent a 6-digit verification code to
          </p>

          <p className="mt-2 break-all font-semibold text-[#4B3932]">{email}</p>
        </div>

        <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <OtpInput
            value={otp}
            onChange={(value) =>
              setValue("otp", value, {
                shouldValidate: true,
              })
            }
          />

          {errors.otp && <p className="text-center text-sm text-red-500">{errors.otp.message}</p>}

          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-stone-500">Didn't receive the code?</span>

            {timer > 0 ? (
              <span className="font-medium text-stone-400">Resend in {timer}s</span>
            ) : (
              <button
                type="button"
                disabled={resendSignupOtpMutation.isPending}
                onClick={handleResendOtp}
                className="
                  font-semibold
                  text-[#4B3932]
                  transition
                  hover:underline
                  disabled:cursor-not-allowed
                  disabled:text-stone-400
                "
              >
                {resendSignupOtpMutation.isPending ? "Sending..." : "Resend OTP"}
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={verifySignupOtpMutation.isPending}
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
            {verifySignupOtpMutation.isPending ? "Verifying..." : "Verify Email"}
          </button>

          <div className="text-center text-sm text-stone-500">
            Wrong email?
            <Link
              to="/organization/register"
              className="
                ml-2
                font-semibold
                text-[#4B3932]
                hover:underline
              "
            >
              Register Again
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
