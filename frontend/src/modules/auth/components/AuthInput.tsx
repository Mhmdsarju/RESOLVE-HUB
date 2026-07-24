import type { InputHTMLAttributes } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function AuthInput({ label, error, ...props }: AuthInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#4B3932]">{label}</label>

      <input
        {...props}
        className="
          w-full
          rounded-xl
          border
          border-[#E7DDD3]
          bg-white
          px-4
          py-3
          text-sm
          outline-none
          transition-all
          duration-200
          placeholder:text-stone-400
          focus:border-[#4B3932]
          focus:ring-4
          focus:ring-[#4B3932]/10
        "
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
