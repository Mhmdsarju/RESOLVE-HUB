import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Edit, Trash2, Users } from "lucide-react";

import { useTeam } from "../hooks/useTeam";
import EditTeamModal from "../components/EditTeamModal";
import DeleteTeamModal from "../components/DeleteTeamModal";
import TeamMemberList from "@/modules/team-member/components/TeamMemberList";

export default function TeamDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data: team, isLoading, isError } = useTeam(id ?? "");

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <p className="text-stone-500">Loading team...</p>
      </div>
    );
  }

  if (isError || !team) {
    return (
      <div className="space-y-4">
        <Link
          to="/teams"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-[#4B3932]
            hover:underline
          "
        >
          <ArrowLeft size={18} />
          Back to Teams
        </Link>

        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="text-red-500">Failed to load team.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/teams"
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          font-medium
          text-[#4B3932]
          hover:underline
        "
      >
        <ArrowLeft size={18} />
        Back to Teams
      </Link>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-[#F0E7D5]
              text-[#4B3932]
            "
          >
            <Users size={26} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-[#4B3932]">{team.name}</h1>

            <p className="mt-1 text-sm text-stone-500">Team details</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsEditOpen(true)}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-[#E7DDD3]
              px-5
              py-3
              text-sm
              font-semibold
              text-[#4B3932]
              transition
              hover:bg-[#FAF6F0]
            "
          >
            <Edit size={18} />
            Edit Team
          </button>

          <button
            type="button"
            onClick={() => setIsDeleteOpen(true)}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-red-500
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-red-600
            "
          >
            <Trash2 size={18} />
            Delete Team
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#4B3932]">Team Information</h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-stone-500">Team Name</p>

            <p className="mt-1 font-medium text-[#4B3932]">{team.name}</p>
          </div>

          <div>
            <p className="text-sm text-stone-500">Created</p>

            <p className="mt-1 font-medium text-[#4B3932]">
              {new Date(team.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-stone-500">Last Updated</p>

            <p className="mt-1 font-medium text-[#4B3932]">
              {new Date(team.updatedAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-stone-500">Team ID</p>

            <p className="mt-1 break-all text-sm font-medium text-[#4B3932]">{team.id}</p>
          </div>
        </div>
      </div>

      <TeamMemberList teamId={id ?? ""} />

      <EditTeamModal team={team} isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />

      <DeleteTeamModal
        team={team}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onSuccess={() => {
          setIsDeleteOpen(false);
          window.location.href = "/teams";
        }}
      />
    </div>
  );
}
