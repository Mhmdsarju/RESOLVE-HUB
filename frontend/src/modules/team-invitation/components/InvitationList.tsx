import { Mail, Send, X } from "lucide-react";

import { useTeamInvitations } from "../hooks/useTeamInvitations";
import { useCancelTeamInvitation } from "../hooks/useCancelTeamInvitation";

import type { InvitationStatus, TeamInvitation } from "../types/teamInvitation.types";

interface TeamInvitationListProps {
  teamId: string;
  onInvite: () => void;
}

function getStatusLabel(status: InvitationStatus) {
  switch (status) {
    case "PENDING":
      return "Pending";
    case "ACCEPTED":
      return "Accepted";
    case "EXPIRED":
      return "Expired";
    case "CANCELLED":
      return "Cancelled";
  }
}

function getStatusClassName(status: InvitationStatus) {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "ACCEPTED":
      return "bg-green-100 text-green-700";
    case "EXPIRED":
      return "bg-red-100 text-red-700";
    case "CANCELLED":
      return "bg-stone-100 text-stone-600";
  }
}

function isExpired(invitation: TeamInvitation) {
  return invitation.status === "EXPIRED" || new Date(invitation.expiresAt).getTime() <= Date.now();
}

export default function TeamInvitationList({ teamId, onInvite }: TeamInvitationListProps) {
  const { data: invitations, isLoading, isError } = useTeamInvitations(teamId);

  const cancelMutation = useCancelTeamInvitation();

  const handleCancel = async (invitation: TeamInvitation) => {
    await cancelMutation.mutateAsync({
      invitationId: invitation.id,
      teamId,
    });
  };

  return (
    <div className="rounded-2xl bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[#E7DDD3] px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-[#4B3932]">Invitations</h2>

          <p className="mt-1 text-sm text-stone-500">Manage invitations sent to team members.</p>
        </div>

        <button
          type="button"
          onClick={onInvite}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-[#4B3932]
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-[#3B2E29]
          "
        >
          <Send size={16} />
          Invite Member
        </button>
      </div>

      {isLoading && (
        <div className="p-8 text-center">
          <p className="text-sm text-stone-500">Loading invitations...</p>
        </div>
      )}

      {isError && (
        <div className="p-8 text-center">
          <p className="text-sm text-red-500">Failed to load invitations.</p>
        </div>
      )}

      {!isLoading && !isError && invitations?.length === 0 && (
        <div className="p-10 text-center">
          <div
            className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-[#F0E7D5]
                text-[#4B3932]
              "
          >
            <Mail size={20} />
          </div>

          <p className="mt-4 font-medium text-[#4B3932]">No invitations</p>

          <p className="mt-1 text-sm text-stone-500">Invite someone to join this team.</p>
        </div>
      )}

      {!isLoading && !isError && invitations && invitations.length > 0 && (
        <div className="divide-y divide-[#E7DDD3]">
          {invitations.map((invitation) => {
            const expired = isExpired(invitation);

            const displayStatus =
              expired && invitation.status === "PENDING" ? "EXPIRED" : invitation.status;

            return (
              <div
                key={invitation.id}
                className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    px-6
                    py-5
                  "
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div
                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#F0E7D5]
                        text-[#4B3932]
                      "
                  >
                    <Mail size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-medium text-[#4B3932]">{invitation.invitedEmail}</p>

                    <p className="mt-1 text-xs text-stone-500">
                      {invitation.role}
                      {" · "}
                      Expires {new Date(invitation.expiresAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span
                    className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        ${getStatusClassName(displayStatus)}
                      `}
                  >
                    {getStatusLabel(displayStatus)}
                  </span>

                  {displayStatus === "PENDING" && (
                    <button
                      type="button"
                      onClick={() => handleCancel(invitation)}
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

                  {(displayStatus === "EXPIRED" || displayStatus === "CANCELLED") && (
                    <button
                      type="button"
                      onClick={onInvite}
                      className="
                          text-sm
                          font-semibold
                          text-[#4B3932]
                          hover:underline
                        "
                    >
                      Send Invitation
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
