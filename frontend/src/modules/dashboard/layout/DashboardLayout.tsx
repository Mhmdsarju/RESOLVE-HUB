import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import TopNavbar from "../components/navbar/TopNavbar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#FAF6F0]">
      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="flex flex-1 flex-col">
        {/* Navbar */}

        <TopNavbar />

        {/* Page Content */}

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}