import { useEffect, useState } from "react";
import { Plus, Search, Users, X } from "lucide-react";

import { useTeams } from "@/modules/team/hooks/useTeams";

import { useTeamInvitations } from "../hooks/useTeamInvitations";
import { useCancelTeamInvitation } from "../hooks/useCancelTeamInvitation";

import CreateInvitationModal from "../components/CreateInvitationModal";

import type {
  InvitationStatus,
  TeamInvitation,
} from "../types/teamInvitation.types";

export default function TeamInvitationPage() {
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const [cancelInvitation, setCancelInvitation] =
    useState<TeamInvitation | null>(null);

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
        return "border border-amber-200 bg-amber-50 text-amber-700";

      case "ACCEPTED":
        return "border border-emerald-200 bg-emerald-50 text-emerald-700";

      case "EXPIRED":
        return "border border-red-200 bg-red-50 text-red-600";

      case "CANCELLED":
        return "border border-stone-200 bg-stone-50 text-stone-600";

      default:
        return "border border-stone-200 bg-stone-50 text-stone-600";
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
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A78B72]">
            Team Management
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#4B3932]">
            Team Invitations
          </h1>

          <p className="mt-2 text-sm text-stone-500">
            Manage invitations sent to your team members.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateOpen(true)}
          disabled={!activeTeamId}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#4B3932]
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:bg-[#3D302A]
            hover:shadow-lg
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <Plus size={18} />
          Invite Member
        </button>
      </div>

      <div
        className="
          rounded-2xl
          border
          border-[#E7DDD3]
          bg-white
          p-5
          shadow-sm
        "
      >
        <div className="mb-5 flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-[#F0E7D5]
              text-[#4B3932]
            "
          >
            <Users size={19} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#4B3932]">
              Invitation Management
            </h2>

            <p className="mt-0.5 text-xs text-stone-400">
              Select a team and search invitations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[280px_1fr]">
          <div>
            <label
              htmlFor="team-select"
              className="
                mb-2
                block
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-stone-500
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
                bg-[#FCFAF7]
                px-4
                py-3
                text-sm
                font-medium
                text-[#4B3932]
                outline-none
                transition-all
                duration-200
                hover:border-[#D8C4A8]
                focus:border-[#4B3932]
                focus:bg-white
                focus:ring-4
                focus:ring-[#4B3932]/5
                disabled:cursor-not-allowed
                disabled:bg-[#FAF6F0]
                disabled:opacity-60
              "
            >
              {teams.length === 0 && (
                <option value="">No teams available</option>
              )}

              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="invitation-search"
              className="
                mb-2
                block
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-stone-500
              "
            >
              Search Invitations
            </label>

            <div className="relative">
              <Search
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
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
                  bg-[#FCFAF7]
                  py-3
                  pl-11
                  pr-4
                  text-sm
                  text-[#4B3932]
                  outline-none
                  transition-all
                  duration-200
                  placeholder:text-stone-400
                  hover:border-[#D8C4A8]
                  focus:border-[#4B3932]
                  focus:bg-white
                  focus:ring-4
                  focus:ring-[#4B3932]/5
                "
              />
            </div>
          </div>
        </div>
      </div>

      {(isTeamsLoading || isInvitationsLoading) && (
        <div className="grid grid-cols-1 gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="
                animate-pulse
                rounded-2xl
                border
                border-[#E7DDD3]
                bg-white
                p-5
                shadow-sm
              "
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="h-4 w-52 rounded bg-[#F0E7D5]" />
                  <div className="mt-3 h-3 w-28 rounded bg-[#F5EFE7]" />
                </div>

                <div className="h-7 w-20 rounded-full bg-[#F0E7D5]" />

                <div className="h-9 w-20 rounded-xl bg-[#F5EFE7]" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isTeamsLoading && !isInvitationsLoading && isError && (
        <div
          className="
            rounded-2xl
            border
            border-red-100
            bg-gradient-to-br
            from-red-50
            via-white
            to-white
            p-12
            text-center
            shadow-sm
          "
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-500">
            <Users size={24} />
          </div>

          <p className="mt-4 text-sm font-semibold text-red-600">
            Failed to load invitations
          </p>

          <p className="mt-1 text-xs text-red-400">
            Please try again later.
          </p>
        </div>
      )}

      {!isTeamsLoading &&
        !isInvitationsLoading &&
        !isError &&
        filteredInvitations.length === 0 && (
          <div
            className="
              rounded-2xl
              border
              border-[#E7DDD3]
              bg-gradient-to-br
              from-white
              via-white
              to-[#FAF6F0]
              px-6
              py-16
              text-center
              shadow-sm
            "
          >
            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-[#F0E7D5]
                to-[#E8D9C0]
                text-[#4B3932]
                shadow-sm
              "
            >
              <Users size={26} />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-[#4B3932]">
              No invitations found
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-stone-500">
              {search
                ? "No invitations match your search. Try a different email."
                : "Send an invitation to add someone to this team."}
            </p>

            {activeTeamId && (
              <button
                type="button"
                onClick={() => setIsCreateOpen(true)}
                className="
                  mt-6
                  rounded-xl
                  bg-[#4B3932]
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-[#3D302A]
                  hover:shadow-md
                "
              >
                Invite Member
              </button>
            )}
          </div>
        )}

      {!isTeamsLoading &&
        !isInvitationsLoading &&
        !isError &&
        filteredInvitations.length > 0 && (
          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-[#E7DDD3]
              bg-white
              shadow-sm
            "
          >
            <div
              className="
                hidden
                grid-cols-[2fr_1fr_1fr_auto]
                items-center
                gap-4
                border-b
                border-[#E7DDD3]
                bg-[#FAF6F0]
                px-6
                py-4
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.12em]
                text-stone-500
                md:grid
              "
            >
              <span>Email</span>
              <span>Role</span>
              <span>Status</span>
              <span className="text-right">Action</span>
            </div>

            <div className="divide-y divide-[#E7DDD3]">
              {filteredInvitations.map((invitation) => {
                const status = getDisplayStatus(invitation);

                return (
                  <div
                    key={invitation.id}
                    className="
                      grid
                      grid-cols-1
                      gap-4
                      px-5
                      py-5
                      transition-all
                      duration-200
                      hover:bg-[#FCFAF7]
                      md:grid-cols-[2fr_1fr_1fr_auto]
                      md:items-center
                      md:gap-4
                      md:px-6
                    "
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#4B3932]">
                        {invitation.invitedEmail}
                      </p>

                      <p className="mt-1.5 text-xs text-stone-400">
                        Expires{" "}
                        {new Date(
                          invitation.expiresAt,
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 md:block">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 md:hidden">
                        Role
                      </span>

                      <span className="text-sm font-medium text-[#4B3932]">
                        {invitation.role}
                      </span>
                    </div>

                    <div>
                      <span
                        className={`
                          inline-flex
                          rounded-full
                          px-3
                          py-1.5
                          text-[11px]
                          font-semibold
                          tracking-wide
                          ${getStatusClassName(status)}
                        `}
                      >
                        {status}
                      </span>
                    </div>

                    <div className="flex items-center justify-start md:justify-end">
                      {status === "PENDING" && (
                        <button
                          type="button"
                          onClick={() => handleCancelClick(invitation)}
                          disabled={cancelMutation.isPending}
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-red-100
                            bg-white
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-red-500
                            transition-all
                            duration-200
                            hover:border-red-200
                            hover:bg-red-50
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                          "
                          title="Cancel invitation"
                        >
                          <X size={15} />
                          Cancel
                        </button>
                      )}

                      {(status === "EXPIRED" ||
                        status === "CANCELLED") && (
                        <button
                          type="button"
                          onClick={() => setIsCreateOpen(true)}
                          className="
                            rounded-xl
                            border
                            border-[#E7DDD3]
                            bg-[#FCFAF7]
                            px-3
                            py-2
                            text-xs
                            font-semibold
                            text-[#4B3932]
                            transition-all
                            duration-200
                            hover:border-[#D8C4A8]
                            hover:bg-[#F0E7D5]
                          "
                        >
                          Send Again
                        </button>
                      )}

                      {status === "ACCEPTED" && (
                        <span className="text-xs font-medium text-stone-400">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      {activeTeamId && (
        <CreateInvitationModal
          teamId={activeTeamId}
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
        />
      )}

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
            backdrop-blur-sm
          "
        >
          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              border
              border-[#E7DDD3]
              bg-white
              p-6
              shadow-2xl
            "
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[#4B3932]">
                  Cancel Invitation?
                </h2>

                <p className="mt-2 text-sm leading-6 text-stone-500">
                  Are you sure you want to cancel the invitation sent to{" "}
                  <span className="font-semibold text-[#4B3932]">
                    {cancelInvitation.invitedEmail}
                  </span>
                  ?
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseCancelConfirmation}
                disabled={cancelMutation.isPending}
                className="
                  rounded-lg
                  p-2
                  text-stone-400
                  transition
                  hover:bg-[#FAF6F0]
                  hover:text-[#4B3932]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseCancelConfirmation}
                disabled={cancelMutation.isPending}
                className="
                  rounded-xl
                  border
                  border-[#E7DDD3]
                  bg-white
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-[#4B3932]
                  transition-all
                  duration-200
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
                  shadow-sm
                  transition-all
                  duration-200
                  hover:bg-red-600
                  hover:shadow-md
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