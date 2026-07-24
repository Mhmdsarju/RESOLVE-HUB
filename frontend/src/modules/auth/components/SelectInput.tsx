import type { SelectHTMLAttributes } from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: string;
}

export default function SelectInput({ label, options, error, ...props }: SelectInputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[#4B3932]">{label}</label>

      <select
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
          focus:border-[#4B3932]
          focus:ring-4
          focus:ring-[#4B3932]/10
        "
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
