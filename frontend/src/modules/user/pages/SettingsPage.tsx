import { useState } from "react";
import { Edit, Save, X } from "lucide-react";

import { useMe } from "../hooks/useMe";
import { useUpdateMe } from "../hooks/useUpdateMe";

export default function SettingsPage() {
  const { data: user, isLoading, isError } = useMe();
  const updateMutation = useUpdateMe();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");

  const handleEdit = () => {
    if (!user) {
      return;
    }

    setFullName(user.name);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFullName("");
    setIsEditing(false);
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
          setFullName("");
          setIsEditing(false);
        },
      },
    );
  };

  return (
    <main className="min-h-full bg-[#FAF7F2]">
      <div className="mx-auto w-full max-w-5xl px-6 py-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#4B3932]">Settings</h1>

          <p className="mt-1 text-sm text-stone-500">Manage your account and profile settings.</p>
        </div>

        <div className="mt-8 space-y-6">
          <section className="rounded-2xl border border-[#E7DDD3] bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#4B3932]">Profile</h2>

                <p className="mt-1 text-sm text-stone-500">Manage your profile information.</p>
              </div>

              {!isEditing && !isLoading && user && (
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
                    bg-white
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-[#4B3932]
                    transition-all
                    duration-200
                    hover:border-[#D8C9BD]
                    hover:bg-[#FAF6F0]
                  "
                >
                  <Edit size={16} />
                  Edit
                </button>
              )}
            </div>

            {isLoading && (
              <div className="mt-6 animate-pulse space-y-5">
                <div>
                  <div className="h-4 w-20 rounded bg-[#F0E7D5]" />
                  <div className="mt-2 h-12 w-full rounded-xl bg-[#FAF6F0]" />
                </div>

                <div>
                  <div className="h-4 w-16 rounded bg-[#F0E7D5]" />
                  <div className="mt-2 h-12 w-full rounded-xl bg-[#FAF6F0]" />
                </div>

                <div>
                  <div className="h-4 w-12 rounded bg-[#F0E7D5]" />
                  <div className="mt-2 h-12 w-full rounded-xl bg-[#FAF6F0]" />
                </div>
              </div>
            )}

            {isError && (
              <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-4">
                <p className="text-sm font-semibold text-red-800">Unable to load profile</p>

                <p className="mt-1 text-xs text-red-600">Please try again later.</p>
              </div>
            )}

            {!isLoading && !isError && user && (
              <div className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="profile-full-name"
                    className="text-sm font-semibold text-[#4B3932]"
                  >
                    Full Name
                  </label>

                  {isEditing ? (
                    <input
                      id="profile-full-name"
                      type="text"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      disabled={updateMutation.isPending}
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
                        transition-all
                        duration-200
                        focus:border-[#4B3932]
                        focus:bg-white
                        focus:ring-2
                        focus:ring-[#4B3932]/10
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    />
                  ) : (
                    <div className="mt-2 rounded-xl bg-[#FAF6F0] px-4 py-3">
                      <p className="text-sm text-[#4B3932]">{user.name}</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#4B3932]">Email</label>

                  <div className="mt-2 flex items-center justify-between gap-3 rounded-xl bg-[#FAF6F0] px-4 py-3">
                    <p className="min-w-0 truncate text-sm text-[#4B3932]">{user.email}</p>

                    <span className="shrink-0 rounded-lg bg-[#F0E7D5] px-2.5 py-1 text-[11px] font-semibold text-[#4B3932]">
                      Verified
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#4B3932]">Role</label>

                  <div className="mt-2 rounded-xl bg-[#FAF6F0] px-4 py-3">
                    <p className="text-sm font-medium text-[#4B3932]">{user.role}</p>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end gap-3 border-t border-[#F0E7D5] pt-5">
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
                        bg-white
                        px-4
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
                        shadow-sm
                        transition-all
                        duration-300
                        hover:bg-[#3B2E29]
                        hover:shadow-md
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                    >
                      <Save size={16} />

                      {updateMutation.isPending ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* <section className="rounded-2xl border border-[#E7DDD3] bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-[#4B3932]">Email</h2>

              <p className="mt-1 text-sm text-stone-500">Manage your email address.</p>
            </div>
          </section>

          <section className="rounded-2xl border border-[#E7DDD3] bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-[#4B3932]">Password</h2>

              <p className="mt-1 text-sm text-stone-500">Manage your account password.</p>
            </div>
          </section> */}
        </div>
      </div>
    </main>
  );
}
