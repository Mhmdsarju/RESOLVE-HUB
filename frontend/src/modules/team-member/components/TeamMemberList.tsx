import { useState } from "react";
import { ChevronLeft, ChevronRight, UserRound, Trash2, X } from "lucide-react";

import { useTeamMembers } from "../hooks/useTeamMembers";
import { useUpdateTeamMemberRole } from "../hooks/useUpdateTeamMemberRole";
import { useRemoveTeamMember } from "../hooks/useRemoveTeamMember";
import type { TeamRole } from "../types/teamMember.types";

interface TeamMemberListProps {
  teamId: string;
}

const ITEMS_PER_PAGE = 5;

export default function TeamMemberList({ teamId }: TeamMemberListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useTeamMembers(teamId, {
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  const updateRoleMutation = useUpdateTeamMemberRole();

  const removeMemberMutation = useRemoveTeamMember();

  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const [pendingRole, setPendingRole] = useState<TeamRole | null>(null);

  const members = data?.items ?? [];
  const pagination = data?.pagination;

  const selectedMember = members.find((member) => member.id === selectedMemberId);

  const handleRoleChange = (memberId: string, role: TeamRole) => {
    const member = members.find((item) => item.id === memberId);

    if (!member || member.role === role) {
      return;
    }

    setSelectedMemberId(memberId);
    setPendingRole(role);
  };

  const handleConfirmRoleChange = () => {
    if (!selectedMemberId || !pendingRole) {
      return;
    }

    updateRoleMutation.mutate(
      {
        teamId,
        memberId: selectedMemberId,
        data: {
          role: pendingRole,
        },
      },
      {
        onSuccess: () => {
          setSelectedMemberId(null);
          setPendingRole(null);
        },
      },
    );
  };

  const handleOpenRemove = (memberId: string) => {
    setSelectedMemberId(memberId);
    setPendingRole(null);
  };

  const handleCancelAction = () => {
    setSelectedMemberId(null);
    setPendingRole(null);
  };

  const handleRemove = () => {
    if (!selectedMemberId) {
      return;
    }

    removeMemberMutation.mutate(
      {
        teamId,
        memberId: selectedMemberId,
      },
      {
        onSuccess: () => {
          setSelectedMemberId(null);
          setPendingRole(null);

          if (members.length === 1 && currentPage > 1) {
            setCurrentPage((page) => page - 1);
          }
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-stone-500">Loading team members...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-red-500">Failed to load team members.</p>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
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
          <UserRound size={20} />
        </div>

        <p className="mt-4 font-medium text-[#4B3932]">No team members</p>

        <p className="mt-1 text-sm text-stone-500">No members have joined this team yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="border-b border-[#E7DDD3] px-6 py-5">
          <h2 className="text-lg font-semibold text-[#4B3932]">Team Members</h2>

          <p className="mt-1 text-sm text-stone-500">
            {pagination?.total ?? members.length} {pagination?.total === 1 ? "member" : "members"}{" "}
            in this team.
          </p>
        </div>
        <div className="divide-y divide-[#E7DDD3]">
          {members.map((member) => (
            <div
              key={member.id}
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
                  <UserRound size={18} />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-medium text-[#4B3932]">{member.name}</p>

                  <p className="mt-1 truncate text-xs text-stone-500">{member.email}</p>

                  <p className="mt-1 text-xs text-stone-400">
                    Joined {new Date(member.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <select
                  value={member.role}
                  onChange={(event) => handleRoleChange(member.id, event.target.value as TeamRole)}
                  disabled={updateRoleMutation.isPending || removeMemberMutation.isPending}
                  className="
                    rounded-xl
                    border
                    border-[#E7DDD3]
                    bg-white
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-[#4B3932]
                    outline-none
                    transition
                    focus:border-[#4B3932]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  <option value="MEMBER">Member</option>

                  <option value="LEAD">Lead</option>
                </select>

                <button
                  type="button"
                  onClick={() => handleOpenRemove(member.id)}
                  disabled={updateRoleMutation.isPending || removeMemberMutation.isPending}
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
                  title="Remove member"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {pagination && pagination.totalPages > 1 && (
          <div
            className="
                flex
                items-center
                justify-between
                border-t
                border-[#E7DDD3]
                px-6
                py-4
              "
          >
            <p className="text-sm text-stone-500">
              Page {pagination.page} of {pagination.totalPages}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                disabled={pagination.page === 1}
                className="
                    rounded-lg
                    border
                    border-[#E7DDD3]
                    p-2
                    text-[#4B3932]
                    transition
                    hover:bg-[#FAF6F0]
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(page + 1, pagination.totalPages))}
                disabled={pagination.page === pagination.totalPages}
                className="
                    rounded-lg
                    border
                    border-[#E7DDD3]
                    p-2
                    text-[#4B3932]
                    transition
                    hover:bg-[#FAF6F0]
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {selectedMember && pendingRole && (
        <div
          className="
            fixed
            inset-0
            z-50
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
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#4B3932]">Change Team Role</h2>

                <p className="mt-2 text-sm leading-6 text-stone-500">
                  Are you sure you want to change this member's role?
                </p>
              </div>

              <button
                type="button"
                onClick={handleCancelAction}
                disabled={updateRoleMutation.isPending}
                className="
                  rounded-lg
                  p-2
                  text-stone-500
                  transition
                  hover:bg-[#FAF6F0]
                  hover:text-[#4B3932]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <X size={20} />
              </button>
            </div>

            <div
              className="
                mt-5
                rounded-xl
                bg-[#FAF6F0]
                px-4
                py-3
              "
            >
              <p className="text-sm font-medium text-[#4B3932]">{selectedMember.name}</p>

              <p className="mt-1 text-xs text-stone-500">{selectedMember.email}</p>

              <p className="mt-2 text-xs text-stone-500">
                {selectedMember.role}

                <span className="mx-1">→</span>

                <span className="font-semibold text-[#4B3932]">{pendingRole}</span>
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancelAction}
                disabled={updateRoleMutation.isPending}
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
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmRoleChange}
                disabled={updateRoleMutation.isPending}
                className="
                  rounded-xl
                  bg-[#4B3932]
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#3B2E29]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {updateRoleMutation.isPending ? "Updating..." : "Change Role"}
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedMember && !pendingRole && (
        <div
          className="
            fixed
            inset-0
            z-50
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
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#4B3932]">Remove Team Member</h2>

                <p className="mt-2 text-sm leading-6 text-stone-500">
                  Are you sure you want to remove this member from the team?
                </p>
              </div>

              <button
                type="button"
                onClick={handleCancelAction}
                disabled={removeMemberMutation.isPending}
                className="
                  rounded-lg
                  p-2
                  text-stone-500
                  transition
                  hover:bg-[#FAF6F0]
                  hover:text-[#4B3932]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <X size={20} />
              </button>
            </div>

            <div
              className="
                mt-5
                rounded-xl
                bg-[#FAF6F0]
                px-4
                py-3
              "
            >
              <p className="text-sm font-medium text-[#4B3932]">{selectedMember.name}</p>

              <p className="mt-1 text-xs text-stone-500">{selectedMember.email}</p>

              <p className="mt-2 text-xs text-stone-500">
                Current role:{" "}
                <span className="font-semibold text-[#4B3932]">{selectedMember.role}</span>
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancelAction}
                disabled={removeMemberMutation.isPending}
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
                Cancel
              </button>

              <button
                type="button"
                onClick={handleRemove}
                disabled={removeMemberMutation.isPending}
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
                  disabled:opacity-60
                "
              >
                {removeMemberMutation.isPending ? "Removing..." : "Remove Member"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
