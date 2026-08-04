import { useEffect, useRef } from "react";

import type { ClipboardEvent, KeyboardEvent } from "react";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function OtpInput({ value, onChange }: OtpInputProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const otp = value.padEnd(6).split("").slice(0, 6);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (index: number, inputValue: string) => {
    if (!/^\d?$/.test(inputValue)) {
      return;
    }

    const updatedOtp = [...otp];
    updatedOtp[index] = inputValue;

    onChange(updatedOtp.join("").trim());

    if (inputValue && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === "Backspace") {
      event.preventDefault();

      const updatedOtp = [...otp];

      if (otp[index]) {
        updatedOtp[index] = "";
        onChange(updatedOtp.join("").trim());
      } else if (index > 0) {
        updatedOtp[index - 1] = "";
        onChange(updatedOtp.join("").trim());
        inputsRef.current[index - 1]?.focus();
      }

      return;
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const pastedValue = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);

    if (pastedValue.length === 0) {
      return;
    }

    onChange(pastedValue);

    const focusIndex = Math.min(pastedValue.length, 5);

    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            inputsRef.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={digit.trim()}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          onPaste={handlePaste}
          className="
  h-12
  w-12
  sm:h-14
  sm:w-14
  rounded-xl
  border
  border-[#E7DDD3]
  bg-white
  text-center
  text-xl
  font-semibold
  text-[#4B3932]
  outline-none
  transition-all
  duration-200
  focus:border-[#4B3932]
  focus:ring-4
  focus:ring-[#4B3932]/10
"
        />
      ))}
    </div>
  );
}
