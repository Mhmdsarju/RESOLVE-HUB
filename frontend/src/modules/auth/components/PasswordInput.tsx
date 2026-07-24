import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import type { InputHTMLAttributes } from "react";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function PasswordInput({ label, error, ...props }: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#4B3932]">{label}</label>

      <div className="relative">
        <input
          {...props}
          type={show ? "text" : "password"}
          className="
            w-full
            rounded-xl
            border
            border-[#E7DDD3]
            bg-white
            px-4
            py-3
            pr-12
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

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-500"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
