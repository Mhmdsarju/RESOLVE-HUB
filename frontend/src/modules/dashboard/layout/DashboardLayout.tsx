import { useState } from "react";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import TopNavbar from "../components/navbar/TopNavbar";

import NotificationRealtimeListener from "@/modules/notification/components/NotificationRealtimeListener";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAF6F0]">
      <NotificationRealtimeListener />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="
              ml-4
              inline-flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-[#E7DDD3]
              bg-white
              text-[#4B3932]
              shadow-sm
              transition
              hover:bg-[#FAF6F0]
              lg:hidden
            "
            aria-label="Open sidebar"
          >
            <Menu size={22} />
          </button>

          <div className="min-w-0 flex-1">
            <TopNavbar />
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}