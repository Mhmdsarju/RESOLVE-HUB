import {
  Building2,
  CheckCircle2,
  Globe,
  MapPin,
  ShieldCheck,
  User,
} from "lucide-react";

import { useAuthStore } from "@/modules/auth/store/authStore";
import { useOrganization } from "@/modules/organization/hooks/useOrganization";

export default function EngineerDashboard() {
  const user = useAuthStore((state) => state.user);

  const { data: organization, isLoading, isError } = useOrganization();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-6">
        <div className="text-sm font-medium text-stone-500">
          Loading dashboard...
        </div>
      </div>
    );
  }

  if (isError || !organization) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-6">
        <div className="rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-white px-8 py-6 text-center shadow-sm">
          <p className="text-sm font-semibold text-red-700">
            Unable to load organization details
          </p>

          <p className="mt-1 text-xs text-red-600">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6  p-6">
      <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-gradient-to-br from-[#4B3932] via-[#5A463D] to-[#756157] p-7 shadow-lg">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

        <div className="absolute -bottom-20 right-32 h-48 w-48 rounded-full bg-amber-200/10 blur-3xl" />

        <div className="relative">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-[#E8D8C8]">
                Engineer Workspace
              </p>

              <h1 className="mt-2 text-3xl font-bold text-white">
                Hi, {user?.name}
              </h1>

              <p className="mt-2 text-sm text-[#E6DAD3]">
                Welcome back to your ResolveHub workspace
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white shadow-inner backdrop-blur-sm">
              <User className="h-7 w-7" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 shadow-sm">
              <User className="h-6 w-6" />
            </div>

            <div>
              <p className="text-sm font-medium text-stone-500">
                Engineer
              </p>

              <h2 className="mt-1 text-lg font-semibold text-stone-800">
                {user?.name}
              </h2>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-gradient-to-r from-stone-50 to-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
                Email
              </p>

              <p className="mt-1 text-sm text-stone-700">
                {user?.email}
              </p>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-stone-50 to-white p-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
                  Role
                </p>

                <p className="mt-1 text-sm font-semibold text-stone-700">
                  {user?.role}
                </p>
              </div>

              <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Active
              </span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-gradient-to-br from-white via-white to-amber-50/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md xl:col-span-2">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-100/50 blur-2xl" />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-stone-500">
                Organization
              </p>

              <h2 className="mt-1 text-2xl font-bold text-stone-800">
                {organization.name}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 text-amber-700 shadow-sm">
              <Building2 className="h-6 w-6" />
            </div>
          </div>

          <div className="relative mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-stone-100 bg-white/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
                Industry
              </p>

              <p className="mt-2 text-sm font-medium capitalize text-stone-700">
                {organization.industry}
              </p>
            </div>

            <div className="rounded-xl border border-stone-100 bg-white/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
                Company Size
              </p>

              <p className="mt-2 text-sm font-medium text-stone-700">
                {organization.companySize}
              </p>
            </div>

            <div className="rounded-xl border border-stone-100 bg-white/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
                Location
              </p>

              <div className="mt-2 flex items-center gap-2 text-sm font-medium text-stone-700">
                <MapPin className="h-4 w-4 text-stone-400" />

                <span>
                  {organization.city}, {organization.state},{" "}
                  {organization.country}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-stone-100 bg-white/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
                Address
              </p>

              <p className="mt-2 text-sm text-stone-700">
                {organization.address}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-100/60 blur-2xl" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-700 shadow-sm">
                <CheckCircle2 className="h-6 w-6" />
              </div>

              <div>
                <p className="text-sm font-medium text-stone-500">
                  Organization Status
                </p>

                <p className="mt-1 text-lg font-bold text-emerald-700">
                  {organization.status}
                </p>
              </div>
            </div>

            <span className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm">
              Verified
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 via-white to-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-100/60 blur-2xl" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 text-blue-700 shadow-sm">
                <ShieldCheck className="h-6 w-6" />
              </div>

              <div>
                <p className="text-sm font-medium text-stone-500">
                  Access Status
                </p>

                <p className="mt-1 text-lg font-bold text-blue-700">
                  {organization.accessStatus}
                </p>
              </div>
            </div>

            <span className="rounded-full border border-blue-200 bg-white px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm">
              Access Granted
            </span>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-gradient-to-br from-white via-white to-stone-50 p-6 shadow-sm">
        <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-amber-100/30 blur-3xl" />

        <div className="relative flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-stone-800">
              Organization Information
            </h2>

            <p className="mt-1 text-sm text-stone-500">
              Additional organization details
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-stone-100 to-stone-50 text-stone-500 shadow-sm">
            <Globe className="h-5 w-5" />
          </div>
        </div>

        <div className="relative mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-stone-100 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
              Website
            </p>

            <p className="mt-2 break-all text-sm font-medium text-stone-700">
              {organization.website || "-"}
            </p>
          </div>

          <div className="rounded-xl border border-stone-100 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
              Phone
            </p>

            <p className="mt-2 text-sm font-medium text-stone-700">
              {organization.phone || "-"}
            </p>
          </div>

          <div className="rounded-xl border border-stone-100 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
              Created At
            </p>

            <p className="mt-2 text-sm font-medium text-stone-700">
              {new Date(
                organization.createdAt,
              ).toLocaleDateString("en-IN")}
            </p>
          </div>
        </div>

        <div className="relative mt-4 rounded-xl border border-stone-100 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-400">
            Description
          </p>

          <p className="mt-2 text-sm leading-6 text-stone-600">
            {organization.description || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}