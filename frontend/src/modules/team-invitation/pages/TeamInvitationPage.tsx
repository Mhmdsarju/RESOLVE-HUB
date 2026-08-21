import { useEffect, useState } from "react";
import { Plus, Search, X } from "lucide-react";

import { useTeams } from "@/modules/team/hooks/useTeams";

import { useTeamInvitations } from "../hooks/useTeamInvitations";
import { useCancelTeamInvitation } from "../hooks/useCancelTeamInvitation";

import CreateInvitationModal from "../components/CreateInvitationModal";

import type { InvitationStatus, TeamInvitation } from "../types/teamInvitation.types";

export default function TeamInvitationPage() {
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const [cancelInvitation, setCancelInvitation] = useState<TeamInvitation | null>(null);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(Date.now());
    };

    updateTime();

    const interval = window.setInterval(updateTime, 60 * 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const { data: teamsData, isLoading: isTeamsLoading } = useTeams({
    page: 1,
    limit: 100,
  });

  const teams = teamsData?.items ?? [];

  const activeTeamId = selectedTeamId || teams[0]?.id || "";

  const {
    data: invitations,
    isLoading: isInvitationsLoading,
    isError,
  } = useTeamInvitations(activeTeamId);

  const cancelMutation = useCancelTeamInvitation();

  const filteredInvitations =
    invitations?.filter((invitation) =>
      invitation.invitedEmail.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  const getDisplayStatus = (invitation: TeamInvitation): InvitationStatus => {
    if (currentTime === null) {
      return invitation.status;
    }

    if (invitation.status === "EXPIRED") {
      return "EXPIRED";
    }

    if (
      invitation.status === "PENDING" &&
      new Date(invitation.expiresAt).getTime() <= currentTime
    ) {
      return "EXPIRED";
    }

    return invitation.status;
  };

  const getStatusClassName = (status: InvitationStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "ACCEPTED":
        return "bg-green-100 text-green-700";

      case "EXPIRED":
        return "bg-red-100 text-red-700";

      case "CANCELLED":
        return "bg-stone-100 text-stone-600";

      default:
        return "bg-stone-100 text-stone-600";
    }
  };

  const handleCancel = async (invitation: TeamInvitation) => {
    await cancelMutation.mutateAsync({
      invitationId: invitation.id,
      teamId: activeTeamId,
    });

    setCancelInvitation(null);
  };

  const handleCancelClick = (invitation: TeamInvitation) => {
    setCancelInvitation(invitation);
  };

  const handleCloseCancelConfirmation = () => {
    if (cancelMutation.isPending) {
      return;
    }

    setCancelInvitation(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#4B3932]">Team Invitations</h1>

          <p className="mt-2 text-stone-500">Manage invitations sent to team members.</p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          disabled={!activeTeamId}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-[#4B3932]
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-[#3B2E29]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <Plus size={18} />
          Invite Member
        </button>
      </div>

      {/* Team Selection + Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        {/* Select Team */}
        <div className="w-full sm:w-72">
          <label
            htmlFor="team-select"
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-[#4B3932]
            "
          >
            Select Team
          </label>

          <select
            id="team-select"
            value={activeTeamId}
            onChange={(event) => {
              setSelectedTeamId(event.target.value);
              setSearch("");
            }}
            disabled={isTeamsLoading || teams.length === 0}
            className="
              w-full
              rounded-xl
              border
              border-[#E7DDD3]
              bg-white
              px-4
              py-3
              text-sm
              font-medium
              text-[#4B3932]
              outline-none
              transition
              hover:border-[#BFAEA1]
              focus:border-[#4B3932]
              disabled:cursor-not-allowed
              disabled:bg-[#FAF6F0]
              disabled:opacity-60
            "
          >
            {teams.length === 0 && <option value="">No teams available</option>}

            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="relative flex-1">
          <label
            htmlFor="invitation-search"
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-[#4B3932]
            "
          >
            Search Invitations
          </label>

          <Search
            size={18}
            className="
              absolute
              left-4
              top-[calc(50%+4px)]
              -translate-y-1/2
              text-stone-400
            "
          />

          <input
            id="invitation-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by email..."
            className="
              w-full
              rounded-xl
              border
              border-[#E7DDD3]
              bg-white
              py-3
              pl-11
              pr-4
              text-sm
              text-[#4B3932]
              outline-none
              transition
              hover:border-[#BFAEA1]
              focus:border-[#4B3932]
            "
          />
        </div>
      </div>

      {/* Loading */}
      {(isTeamsLoading || isInvitationsLoading) && (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="text-stone-500">Loading invitations...</p>
        </div>
      )}

      {/* Error */}
      {!isTeamsLoading && !isInvitationsLoading && isError && (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="text-red-500">Failed to load invitations.</p>
        </div>
      )}

      {/* Empty */}
      {!isTeamsLoading && !isInvitationsLoading && !isError && filteredInvitations.length === 0 && (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-[#4B3932]">No invitations found</h2>

          <p className="mt-2 text-sm text-stone-500">
            Send an invitation to add someone to this team.
          </p>

          {activeTeamId && (
            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="
                  mt-5
                  rounded-xl
                  bg-[#4B3932]
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#3B2E29]
                "
            >
              Invite Member
            </button>
          )}
        </div>
      )}

      {/* Invitations Table */}
      {!isTeamsLoading && !isInvitationsLoading && !isError && filteredInvitations.length > 0 && (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div
            className="
                grid
                grid-cols-[2fr_1fr_1fr_auto]
                items-center
                gap-4
                border-b
                border-[#E7DDD3]
                bg-[#FAF6F0]
                px-6
                py-4
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-stone-500
              "
          >
            <span>Email</span>
            <span>Role</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          <div className="divide-y divide-[#E7DDD3]">
            {filteredInvitations.map((invitation) => {
              const status = getDisplayStatus(invitation);

              return (
                <div
                  key={invitation.id}
                  className="
                        grid
                        grid-cols-[2fr_1fr_1fr_auto]
                        items-center
                        gap-4
                        px-6
                        py-5
                        transition
                        hover:bg-[#FAF6F0]
                      "
                >
                  <div>
                    <p className="font-medium text-[#4B3932]">{invitation.invitedEmail}</p>

                    <p className="mt-1 text-xs text-stone-500">
                      Expires {new Date(invitation.expiresAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-[#4B3932]">{invitation.role}</span>
                  </div>

                  <div>
                    <span
                      className={`
                            inline-flex
                            rounded-full
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            ${getStatusClassName(status)}
                          `}
                    >
                      {status}
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    {status === "PENDING" && (
                      <button
                        type="button"
                        onClick={() => handleCancelClick(invitation)}
                        disabled={cancelMutation.isPending}
                        className="
                              rounded-lg
                              p-2
                              text-stone-500
                              transition
                              hover:bg-red-50
                              hover:text-red-500
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                            "
                        title="Cancel invitation"
                      >
                        <X size={18} />
                      </button>
                    )}

                    {(status === "EXPIRED" || status === "CANCELLED") && (
                      <button
                        type="button"
                        onClick={() => setIsCreateOpen(true)}
                        className="
                              rounded-lg
                              px-3
                              py-2
                              text-sm
                              font-semibold
                              text-[#4B3932]
                              transition
                              hover:bg-[#F0E7D5]
                            "
                      >
                        Send Again
                      </button>
                    )}

                    {status === "ACCEPTED" && (
                      <span className="text-xs text-stone-400">Completed</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Create Invitation Modal */}
      {activeTeamId && (
        <CreateInvitationModal
          teamId={activeTeamId}
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
        />
      )}

      {/* Cancel Confirmation */}
      {cancelInvitation && (
        <div
          className="
            fixed
            inset-0
            z-60
            flex
            items-center
            justify-center
            bg-black/40
            px-4
          "
        >
          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              bg-white
              p-6
              shadow-2xl
            "
          >
            <h2 className="text-xl font-bold text-[#4B3932]">Cancel Invitation?</h2>

            <p className="mt-2 text-sm leading-6 text-stone-500">
              Are you sure you want to cancel the invitation sent to{" "}
              <span className="font-medium text-[#4B3932]">{cancelInvitation.invitedEmail}</span>?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseCancelConfirmation}
                disabled={cancelMutation.isPending}
                className="
                  rounded-xl
                  border
                  border-[#E7DDD3]
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-[#4B3932]
                  transition
                  hover:bg-[#FAF6F0]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                No
              </button>

              <button
                type="button"
                onClick={() => handleCancel(cancelInvitation)}
                disabled={cancelMutation.isPending}
                className="
                  rounded-xl
                  bg-red-500
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-red-600
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {cancelMutation.isPending ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
