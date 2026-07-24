import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import OtpInput from "../components/OtpInput";

import { useVerifyOtp } from "../hooks/useVerifyOtp";
import { useResendForgotPasswordOtp } from "../hooks/useResendForgotPasswordOtp";

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email ?? "";

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);

  const verifyOtpMutation = useVerifyOtp();

  const resendForgotPasswordOtpMutation =
    useResendForgotPasswordOtp();

  useEffect(() => {
    if (timer <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      return;
    }

    const response =
      await verifyOtpMutation.mutateAsync({
        email,
        otp,
      });

    navigate("/forgot-password/reset-password", {
      state: {
        email,
        resetToken: response.resetToken,
      },
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF6F0] px-4 py-8">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        {/* Header */}

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#4B3932]">
            Verify OTP
          </h1>

          <p className="mt-3 text-stone-500">
            Enter the 6-digit code sent to
          </p>

          <p className="font-medium text-[#4B3932]">
            {email}
          </p>
        </div>

        {/* OTP */}

        <OtpInput
          value={otp}
          onChange={setOtp}
        />

        {/* Verify Button */}

        <button
          type="button"
          onClick={handleVerify}
          disabled={
            otp.length !== 6 ||
            verifyOtpMutation.isPending
          }
          className="
            mt-8
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
          {verifyOtpMutation.isPending
            ? "Verifying..."
            : "Verify OTP"}
        </button>

        {/* Resend */}

        <div className="mt-8 flex items-center justify-center gap-2 text-sm">
          <span className="text-stone-500">
            Didn't receive the code?
          </span>

          {timer > 0 ? (
            <span className="font-medium text-stone-400">
              Resend in {timer}s
            </span>
          ) : (
            <button
              type="button"
              disabled={
                resendForgotPasswordOtpMutation.isPending
              }
              onClick={async () => {
                await resendForgotPasswordOtpMutation.mutateAsync({
                  email,
                });

                setTimer(60);
              }}
              className="
                font-semibold
                text-[#4B3932]
                transition
                hover:underline
                disabled:cursor-not-allowed
                disabled:text-stone-400
              "
            >
              {resendForgotPasswordOtpMutation.isPending
                ? "Sending..."
                : "Resend OTP"}
            </button>
          )}
        </div>

        <div className="mt-8 border-t border-[#E7DDD3]" />

        {/* Back */}

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() =>
              navigate("/forgot-password")
            }
            className="
              text-sm
              font-medium
              text-[#4B3932]
              hover:underline
            "
          >
            ← Back
          </button>
        </div>
      </div>
    </main>
  );
}