import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import TopNavbar from "../components/navbar/TopNavbar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#FAF6F0]">
      <aside className="h-screen shrink-0">
        <Sidebar />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="shrink-0">
          <TopNavbar />
        </div>

        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
