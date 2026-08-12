import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { useAcceptTeamInvitation } from "../hooks/useAcceptTeamInvitation";

export default function AcceptInvitationPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const acceptInvitationMutation = useAcceptTeamInvitation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!token || password !== confirmPassword) {
      return;
    }

    try {
      await acceptInvitationMutation.mutateAsync({
        token,
        data: {
          name,
          password,
        },
      });

      navigate("/dashboard");
    } catch {
      return;
    }
  };

  return (
    <main className="min-h-screen bg-[#EDEAE3] px-4 py-10">
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#4B3932]">Accept Team Invitation</h1>

            <p className="mt-3 text-sm leading-6 text-stone-500">
              Complete your registration to join the team as an engineer.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#4B3932]">
                Full Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
                disabled={acceptInvitationMutation.isPending}
                className="
                  w-full
                  rounded-xl
                  border border-[#E7DDD3]
                  px-4 py-3
                  text-sm
                  outline-none
                  transition
                  focus:border-[#4B3932]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#4B3932]">
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Create a password"
                  disabled={acceptInvitationMutation.isPending}
                  className="
                    w-full
                    rounded-xl
                    border border-[#E7DDD3]
                    px-4 py-3 pr-12
                    text-sm
                    outline-none
                    transition
                    focus:border-[#4B3932]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  disabled={acceptInvitationMutation.isPending}
                  className="
                    absolute
                    right-3 top-1/2
                    -translate-y-1/2
                    rounded-lg
                    p-1.5
                    text-stone-500
                    transition
                    hover:bg-[#FAF6F0]
                    hover:text-[#4B3932]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-[#4B3932]"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Confirm your password"
                  disabled={acceptInvitationMutation.isPending}
                  className="
                    w-full
                    rounded-xl
                    border border-[#E7DDD3]
                    px-4 py-3 pr-12
                    text-sm
                    outline-none
                    transition
                    focus:border-[#4B3932]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((previous) => !previous)}
                  disabled={acceptInvitationMutation.isPending}
                  className="
                    absolute
                    right-3 top-1/2
                    -translate-y-1/2
                    rounded-lg
                    p-1.5
                    text-stone-500
                    transition
                    hover:bg-[#FAF6F0]
                    hover:text-[#4B3932]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                  aria-label={
                    showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {password && confirmPassword && password !== confirmPassword && (
              <p className="text-sm text-red-500">Passwords do not match.</p>
            )}

            {!token && <p className="text-sm text-red-500">Invalid invitation link.</p>}

            <button
              type="submit"
              disabled={
                !token ||
                !name ||
                !password ||
                !confirmPassword ||
                password !== confirmPassword ||
                acceptInvitationMutation.isPending
              }
              className="
                w-full
                rounded-xl
                bg-[#4B3932]
                px-5 py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#3B2E29]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {acceptInvitationMutation.isPending ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
