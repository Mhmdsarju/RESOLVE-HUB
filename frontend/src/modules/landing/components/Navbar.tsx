import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import logo from "@/assets/resolvehub-logo.png";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#FAF6F0]/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="ResolveHub Logo"
              className="h-12 w-12 rounded-2xl border border-stone-200  p-1 object-contain shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:rotate-3 hover:shadow-xl"
            />

            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-[#4B3932]">ResolveHub</h1>

              <p className="text-xs text-stone-500">Enterprise Incident Management</p>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-stone-700 transition hover:text-[#4B3932]"
          >
            Features
          </a>

          <a
            href="#architecture"
            className="text-sm font-medium text-stone-700 transition hover:text-[#4B3932]"
          >
            Architecture
          </a>

          <a
            href="#pricing"
            className="text-sm font-medium text-stone-700 transition hover:text-[#4B3932]"
          >
            Pricing
          </a>
        </nav>

        {/* Right Side */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/organization/login"
            className="rounded-lg border border-stone-300 px-5 py-2 text-sm font-medium transition hover:bg-stone-100"
          >
            Sign In
          </Link>

          <Link
            to="/organization/register"
            className="rounded-lg bg-[#4B3932] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#3C2D28]"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="rounded-lg border border-stone-300 p-2 md:hidden">
          <Menu className="h-5 w-5 text-[#4B3932]" />
        </button>
      </div>
    </header>
  );
}
