import { useNavigate } from "react-router-dom";

import {
  engineerSidebar,
  orgAdminSidebar,
  superAdminSidebar,
} from "../../constants";
import type { SidebarSection as SidebarSectionType } from "../../types/sidebar.types";

import SidebarProfile from "./SidebarProfile";
import SidebarSection from "./SidebarSection";

import logo from "@/assets/resolvehub-logo.png";

import { logout } from "@/modules/auth/api/authApi";
import { useAuthStore } from "@/modules/auth/store/authStore";

const sidebarMenus: Record<
  "ORG_ADMIN" | "ENGINEER" | "SUPER_ADMIN",
  SidebarSectionType[]
> = {
  ORG_ADMIN: orgAdminSidebar,
  ENGINEER: engineerSidebar,
  SUPER_ADMIN: superAdminSidebar,
};

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({
  isOpen = false,
  onClose,
}: SidebarProps) {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      clearUser();
      navigate("/organization/login", { replace: true });
    }
  };

  const menu = user ? sidebarMenus[user.role] : [];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="
            fixed
            inset-0
            z-40
            bg-black/40
            lg:hidden
          "
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          h-screen
          w-72
          flex-col
          border-r
          border-[#5A463E]
          bg-[#4B3932]
          shadow-2xl
          transition-transform
          duration-300
          ease-in-out
          lg:static
          lg:z-auto
          lg:translate-x-0
          lg:shadow-2xl
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="border-b border-[#5A463E] px-6 py-6">
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="ResolveHub"
              className="
                h-12
                w-12
                rounded-xl
                border
                border-[#CBB8A8]
                bg-white
                p-1.5
                object-contain
                shadow-sm
              "
            />

            <div>
              <h1 className="text-xl font-bold tracking-wide text-[#F5EFE7]">
                ResolveHub
              </h1>

              <p className="mt-1 text-xs uppercase tracking-widest text-[#CBB8A8]">
                Enterprise Edition
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div
          className="
            flex-1
            space-y-8
            overflow-y-auto
            px-4
            py-6
          "
        >
          {menu.map((section) => (
            <SidebarSection
              key={section.title}
              section={section}
              onNavigate={onClose}
            />
          ))}
        </div>

        {/* Profile */}
        <div className="px-4 pb-5">
          <SidebarProfile onLogout={handleLogout} />
        </div>
      </aside>
    </>
  );
}