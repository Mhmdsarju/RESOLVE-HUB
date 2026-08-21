import { useState } from "react";
import { Edit, Save, X } from "lucide-react";

import { useMe } from "../hooks/useMe";
import { useUpdateMe } from "../hooks/useUpdateMe";

export default function ProfileSection() {
  const { data: user, isLoading } = useMe();
  const updateMutation = useUpdateMe();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");

  const handleEdit = () => {
    if (!user) {
      return;
    }

    setFullName(user.name ?? "");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFullName("");
  };

  const handleSave = () => {
    const trimmedName = fullName.trim();

    if (!trimmedName) {
      return;
    }

    updateMutation.mutate(
      {
        name: trimmedName,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          setFullName("");
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-[#E7DDD3] bg-white p-6">
        <div className="h-6 w-32 animate-pulse rounded bg-[#F0E7D5]" />
        <div className="mt-5 h-12 w-full animate-pulse rounded-xl bg-[#FAF6F0]" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-[#E7DDD3] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#4B3932]">Profile</h2>

          <p className="mt-1 text-sm text-stone-500">Manage your profile information.</p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={handleEdit}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-[#E7DDD3]
              px-4
              py-2
              text-sm
              font-medium
              text-[#4B3932]
              transition
              hover:bg-[#FAF6F0]
            "
          >
            <Edit size={16} />
            Edit
          </button>
        )}
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <label className="text-sm font-semibold text-[#4B3932]">Full Name</label>

          {isEditing ? (
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="
                mt-2
                w-full
                rounded-xl
                border
                border-[#E7DDD3]
                bg-[#FAF6F0]
                px-4
                py-3
                text-sm
                text-[#4B3932]
                outline-none
                focus:border-[#4B3932]
                focus:bg-white
                focus:ring-2
                focus:ring-[#4B3932]/10
              "
            />
          ) : (
            <p className="mt-2 rounded-xl bg-[#FAF6F0] px-4 py-3 text-sm text-[#4B3932]">
              {user.name}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-[#4B3932]">Email</label>

          <p className="mt-2 rounded-xl bg-[#FAF6F0] px-4 py-3 text-sm text-[#4B3932]">
            {user.email}
          </p>
        </div>

        <div>
          <label className="text-sm font-semibold text-[#4B3932]">Role</label>

          <p className="mt-2 rounded-xl bg-[#FAF6F0] px-4 py-3 text-sm font-medium text-[#4B3932]">
            {user.role}
          </p>
        </div>
      </div>

      {isEditing && (
        <div className="mt-6 flex justify-end gap-3 border-t border-[#F0E7D5] pt-5">
          <button
            type="button"
            onClick={handleCancel}
            disabled={updateMutation.isPending}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-[#E7DDD3]
              px-4
              py-2.5
              text-sm
              font-medium
              text-[#4B3932]
              hover:bg-[#FAF6F0]
              disabled:opacity-50
            "
          >
            <X size={16} />
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={updateMutation.isPending || !fullName.trim()}
            className="
              inline-flex
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
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <Save size={16} />

            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}
    </section>
  );
}
