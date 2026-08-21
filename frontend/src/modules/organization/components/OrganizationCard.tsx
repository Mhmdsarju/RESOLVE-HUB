import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Globe2,
  MapPin,
  Pencil,
  Phone,
  Users,
  XCircle,
} from "lucide-react";

import type { Organization } from "../types/organization.types";

interface OrganizationCardProps {
  organization: Organization;
  onEdit: () => void;
  onChangePassword: () => void;
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Building2;
  label: string;
  value?: string | null;
}) {
  return (
    <div className="rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-4 transition-colors hover:border-[#D8C9BD]">
      <div className="flex items-center gap-2">
        <Icon size={15} className="text-[#4B3932]" />

        <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">{label}</p>
      </div>

      <p className="mt-2 wrap-break-words text-sm font-semibold text-[#4B3932]">
        {value?.trim() || "Not provided"}
      </p>
    </div>
  );
}

function formatDate(value?: string | null) {
  if (!value) {
    return "Not available";
  }

  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function OrganizationCard({ organization, onEdit }: OrganizationCardProps) {
  const isActive = organization.status === "ACTIVE";

  return (
    <div className="overflow-hidden rounded-24px bg-white">
      <div className="relative overflow-hidden bg-[#4B3932] px-6 py-7 sm:px-8">
        <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/5" />
        <div className="absolute -bottom-24 right-20 h-40 w-40 rounded-full bg-white/0.03" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#F0E7D5] text-[#4B3932] shadow-lg">
              <Building2 size={28} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="truncate text-xl font-bold text-white sm:text-2xl">
                  {organization.name}
                </h2>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    isActive
                      ? "bg-emerald-400/15 text-emerald-200"
                      : "bg-amber-400/15 text-amber-200"
                  }`}
                >
                  {isActive ? <CheckCircle2 size={12} /> : <XCircle size={12} />}

                  {organization.status}
                </span>
              </div>

              <p className="mt-1 text-sm text-white/55">Organization profile</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-[#4B3932] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FAF6F0] hover:shadow-md"
          >
            <Pencil size={15} />
            Edit
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <div className="mb-5">
          <div className="flex items-center gap-2">
            <div className="h-5 w-1 rounded-full bg-[#4B3932]" />

            <h3 className="text-sm font-bold text-[#4B3932]">Organization Information</h3>
          </div>

          <p className="mt-1 pl-3 text-xs text-stone-400">
            Basic information about your organization.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DetailItem icon={Building2} label="Organization Name" value={organization.name} />

          <DetailItem icon={Building2} label="Industry" value={organization.industry} />

          <DetailItem icon={Users} label="Company Size" value={organization.companySize} />

          <DetailItem icon={Globe2} label="Website" value={organization.website} />

          <DetailItem icon={Phone} label="Phone" value={organization.phone} />

          <DetailItem icon={MapPin} label="Country" value={organization.country} />

          <DetailItem icon={MapPin} label="State" value={organization.state} />

          <DetailItem icon={MapPin} label="City" value={organization.city} />

          <DetailItem icon={CalendarDays} label="Status" value={organization.status} />
        </div>

        <div className="mt-4 rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-4">
          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-[#4B3932]" />

            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Address</p>
          </div>

          <p className="mt-2 text-sm font-semibold leading-6 text-[#4B3932]">
            {organization.address?.trim() || "Not provided"}
          </p>
        </div>

        <div className="mt-4 rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-4">
          <div className="flex items-center gap-2">
            <Building2 size={15} className="text-[#4B3932]" />

            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
              Description
            </p>
          </div>

          <p className="mt-2 text-sm leading-6 text-stone-600">
            {organization.description?.trim() || "No description provided."}
          </p>
        </div>

        <div className="mt-5 grid gap-3 border-t border-[#E7DDD3] pt-5 sm:grid-cols-2">
          <div className="flex items-center justify-between rounded-xl bg-[#FAF6F0] px-4 py-3">
            <div className="flex items-center gap-2">
              <CalendarDays size={15} className="text-stone-400" />

              <span className="text-xs text-stone-500">Created</span>
            </div>

            <span className="text-xs font-semibold text-[#4B3932]">
              {formatDate(organization.createdAt)}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-[#FAF6F0] px-4 py-3">
            <div className="flex items-center gap-2">
              <CalendarDays size={15} className="text-stone-400" />

              <span className="text-xs text-stone-500">Last Updated</span>
            </div>

            <span className="text-xs font-semibold text-[#4B3932]">
              {formatDate(organization.updatedAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
