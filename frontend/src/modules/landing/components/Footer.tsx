import { Link } from "react-router-dom";
import logo from "@/assets/resolvehub-logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-[#F0E7D5]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-10 lg:flex-row lg:px-8">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="ResolveHub Logo"
            className="h-12 w-12 rounded-2xl border border-stone-200 bg-white p-1 object-contain shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:rotate-3 hover:shadow-xl"
          />

          <div>
            <h3 className="font-bold text-[#4B3932]">ResolveHub</h3>

            <p className="text-sm text-stone-500">Enterprise Incident Management</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-stone-600">
          <a href="#features">Features</a>

          <a href="#architecture">Architecture</a>

          <a href="#pricing">Pricing</a>

          <Link to="/organization/login">Login</Link>

          <Link to="/organization/register">Register</Link>
        </div>

        <p className="text-sm text-stone-500">©️ 2026 ResolveHub. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
