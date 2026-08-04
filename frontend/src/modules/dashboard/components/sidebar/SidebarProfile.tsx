import { LogOut } from "lucide-react";
import { useState } from "react";

import { useAuthStore } from "@/modules/auth/store/authStore";

interface SidebarProfileProps {
  onLogout: () => Promise<void>;
}

export default function SidebarProfile({
  onLogout,
}: SidebarProfileProps) {
  const user = useAuthStore((state) => state.user);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await onLogout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="border-t border-[#5A463E] pt-5">
      {/* User Info */}
      <div className="mb-5 flex items-center gap-3">
        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-[#F0E7D5]
            text-sm
            font-bold
            text-[#4B3932]
          "
        >
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#F5EFE7]">
            {user?.name}
          </p>

          <p className="truncate text-xs text-[#CBB8A8]">
            {user?.role}
          </p>
        </div>
      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="
          flex
          w-full
          items-center
          gap-3
          rounded-xl
          px-3
          py-3
          text-sm
          font-medium
          text-[#E7DDD3]
          transition-all
          duration-200
          hover:bg-[#5A463E]
          hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        <LogOut size={18} />

        <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
      </button>
    </div>
  );
}