import { Check, UserRound, Users, X } from "lucide-react";

import { useState } from "react";

import type { AssignTaskModalProps, AssignTaskFormProps } from "../types/task.types";

export default function AssignTaskModal({
  task,
  users,
  isSubmitting,
  onClose,
  onSubmit,
}: AssignTaskModalProps) {
  if (!task) {
    return null;
  }

  return (
    <AssignTaskForm
      key={task.id}
      task={task}
      users={users}
      isSubmitting={isSubmitting}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}

function AssignTaskForm({ task, users, isSubmitting, onClose, onSubmit }: AssignTaskFormProps) {
  const [userId, setUserId] = useState(task.assignedTo ?? "");

  const [showConfirmation, setShowConfirmation] = useState(false);

  const assignedUser = users.find((user) => user.id === task.assignedTo);

  const selectedUser = users.find((user) => user.id === userId);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) {
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (!userId) {
      return;
    }

    onSubmit(userId);
  };

  const handleCancelConfirmation = () => {
    if (isSubmitting) {
      return;
    }

    setShowConfirmation(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
        <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#E7DDD3] px-6 py-5">
            <div>
              <h2 className="text-xl font-bold text-[#4B3932]">
                {task.assignedTo ? "Reassign Task" : "Assign Task"}
              </h2>

              <p className="mt-1 text-sm text-stone-500">
                {task.assignedTo
                  ? "Assign this task to another engineer."
                  : "Assign this task to an engineer."}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="
                rounded-xl
                p-2
                text-stone-400
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

          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-5 rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-stone-500">
                <UserRound size={14} />
                Task
              </div>

              <p className="mt-1 truncate font-semibold text-[#4B3932]">{task.title}</p>
            </div>

            {assignedUser && (
              <div className="mb-5 rounded-2xl border border-[#E7DDD3] bg-white p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-stone-400">
                  <Check size={14} />
                  Currently assigned to
                </div>

                <div className="mt-2 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F0E7D5] text-sm font-bold text-[#4B3932]">
                    {assignedUser.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#4B3932]">
                      {assignedUser.name}
                    </p>

                    {assignedUser.email && (
                      <p className="truncate text-xs text-stone-400">{assignedUser.email}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#4B3932]">
                Select engineer
              </label>

              {users.length === 0 ? (
                <div className="flex items-center gap-3 rounded-xl border border-dashed border-[#D8C9BD] bg-[#FAF6F0] px-4 py-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0E7D5] text-[#4B3932]">
                    <Users size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#4B3932]">No team members found</p>

                    <p className="mt-0.5 text-xs text-stone-400">
                      Add engineers to the assigned team first.
                    </p>
                  </div>
                </div>
              ) : (
                <select
                  value={userId}
                  onChange={(event) => setUserId(event.target.value)}
                  disabled={isSubmitting}
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
                    focus:border-[#BFAEA1]
                    disabled:cursor-not-allowed
                    disabled:bg-[#FAF6F0]
                    disabled:opacity-60
                  "
                >
                  <option value="">Select an engineer</option>

                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                      {user.email ? ` — ${user.email}` : ""}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-[#E7DDD3] pt-5">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="
                  rounded-xl
                  border
                  border-[#E7DDD3]
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
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
                disabled={isSubmitting || !userId || users.length === 0}
                className="
                  inline-flex
                  items-center
                  justify-center
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
                  disabled:opacity-50
                "
              >
                {task.assignedTo ? "Reassign Task" : "Assign Task"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showConfirmation && selectedUser && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0E7D5] text-[#4B3932]">
              <UserRound size={22} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-[#4B3932]">
              {task.assignedTo ? "Confirm Reassignment" : "Confirm Assignment"}
            </h3>

            <p className="mt-2 text-sm leading-6 text-stone-500">
              Are you sure you want to {task.assignedTo ? "reassign" : "assign"}{" "}
              <span className="font-semibold text-[#4B3932]">"{task.title}"</span> to{" "}
              <span className="font-semibold text-[#4B3932]">{selectedUser.name}</span>?
            </p>

            <div className="mt-6 rounded-2xl bg-[#FAF6F0] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0E7D5] text-sm font-bold text-[#4B3932]">
                  {selectedUser.name.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#4B3932]">
                    {selectedUser.name}
                  </p>

                  {selectedUser.email && (
                    <p className="truncate text-xs text-stone-400">{selectedUser.email}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancelConfirmation}
                disabled={isSubmitting}
                className="
                  rounded-xl
                  border
                  border-[#E7DDD3]
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
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
                onClick={handleConfirm}
                disabled={isSubmitting}
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
                  disabled:opacity-50
                "
              >
                {isSubmitting
                  ? "Assigning..."
                  : task.assignedTo
                    ? "Confirm Reassign"
                    : "Confirm Assign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
