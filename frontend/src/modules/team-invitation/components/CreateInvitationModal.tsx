import { useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUsers } from "@/modules/auth/hooks/useUsers";

import { useCreateTeamInvitation } from "../hooks/useCreateTeamInvitation";
import { useAddTeamMember } from "@/modules/team-member/hooks/useAddTeamMember";

import {
  createTeamInvitationSchema,
  type CreateTeamInvitationFormData,
} from "../validations/teamInvitation.schema";

interface CreateInvitationModalProps {
  teamId: string;
  isOpen: boolean;
  onClose: () => void;
}

type InviteMode = "existing" | "email";

export default function CreateInvitationModal({
  teamId,
  isOpen,
  onClose,
}: CreateInvitationModalProps) {
  const [inviteMode, setInviteMode] = useState<InviteMode>("existing");

  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const createInvitationMutation = useCreateTeamInvitation();

  const addTeamMemberMutation = useAddTeamMember();

  const { data: users, isLoading: isUsersLoading } = useUsers();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateTeamInvitationFormData>({
    resolver: zodResolver(createTeamInvitationSchema),

    defaultValues: {
      invitedEmail: "",
      role: "MEMBER",
    },
  });

  if (!isOpen) {
    return null;
  }

  const isPending = createInvitationMutation.isPending || addTeamMemberMutation.isPending;

  const handleClose = () => {
    setInviteMode("existing");
    setSelectedUserId("");

    reset({
      invitedEmail: "",
      role: "MEMBER",
    });

    onClose();
  };

  const handleModeChange = (mode: InviteMode) => {
    setInviteMode(mode);
    setSelectedUserId("");

    setValue("invitedEmail", "", {
      shouldValidate: false,
    });

    setValue("role", "MEMBER", {
      shouldValidate: false,
    });
  };

  const handleExistingUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = event.target.value;

    setSelectedUserId(userId);

    const selectedUser = users?.find((user) => user.id === userId);

    setValue("invitedEmail", selectedUser?.email ?? "", {
      shouldValidate: true,
    });
  };

  const handleFormSubmit = async (data: CreateTeamInvitationFormData) => {
    try {
      if (inviteMode === "existing") {
        if (!selectedUserId) {
          return;
        }

        await addTeamMemberMutation.mutateAsync({
          teamId,

          data: {
            userId: selectedUserId,
            role: data.role,
          },
        });

        handleClose();

        return;
      }

      await createInvitationMutation.mutateAsync({
        teamId,
        data,
      });

      handleClose();
    } catch {
      // Error is already handled inside the mutation hooks.
    }
  };

  return (
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
          max-w-lg
          rounded-2xl
          bg-white
          p-8
          shadow-2xl
        "
      >
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#4B3932]">Add Team Member</h2>

            <p className="mt-1 text-sm text-stone-500">
              Add an existing user or invite someone by email.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isPending}
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
            mb-6
            grid
            grid-cols-2
            rounded-xl
            bg-[#FAF6F0]
            p-1
          "
        >
          <button
            type="button"
            onClick={() => handleModeChange("existing")}
            disabled={isPending}
            className={`
              rounded-lg
              px-4
              py-2.5
              text-sm
              font-semibold
              transition
              disabled:cursor-not-allowed
              disabled:opacity-50
              ${
                inviteMode === "existing"
                  ? "bg-white text-[#4B3932] shadow-sm"
                  : "text-stone-500 hover:text-[#4B3932]"
              }
            `}
          >
            Existing User
          </button>

          <button
            type="button"
            onClick={() => handleModeChange("email")}
            disabled={isPending}
            className={`
              rounded-lg
              px-4
              py-2.5
              text-sm
              font-semibold
              transition
              disabled:cursor-not-allowed
              disabled:opacity-50
              ${
                inviteMode === "email"
                  ? "bg-white text-[#4B3932] shadow-sm"
                  : "text-stone-500 hover:text-[#4B3932]"
              }
            `}
          >
            Invite by Email
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* User / Email */}
          <div>
            {inviteMode === "existing" ? (
              <>
                <label className="mb-2 block text-sm font-medium text-[#4B3932]">Select User</label>

                <select
                  value={selectedUserId}
                  onChange={handleExistingUserChange}
                  disabled={isUsersLoading || isPending}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#E7DDD3]
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-[#4B3932]
                    outline-none
                    transition
                    focus:border-[#4B3932]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  <option value="">
                    {isUsersLoading ? "Loading users..." : "Select an existing user"}
                  </option>

                  {users?.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} - {user.email}
                    </option>
                  ))}
                </select>

                {!isUsersLoading && users && users.length === 0 && (
                  <p className="mt-2 text-xs text-stone-400">No existing users found.</p>
                )}
              </>
            ) : (
              <>
                <label className="mb-2 block text-sm font-medium text-[#4B3932]">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="member@example.com"
                  {...register("invitedEmail")}
                  disabled={isPending}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#E7DDD3]
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:border-[#4B3932]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />
              </>
            )}

            {errors.invitedEmail && (
              <p className="mt-1 text-sm text-red-500">{errors.invitedEmail.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#4B3932]">Team Role</label>

            <select
              {...register("role")}
              disabled={isPending}
              className="
                w-full
                rounded-xl
                border
                border-[#E7DDD3]
                bg-white
                px-4
                py-3
                text-sm
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

            {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
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
              type="submit"
              disabled={
                isPending || isUsersLoading || (inviteMode === "existing" && !selectedUserId)
              }
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
              {isPending
                ? inviteMode === "existing"
                  ? "Adding..."
                  : "Sending..."
                : inviteMode === "existing"
                  ? "Add Team"
                  : "Send Invitation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
