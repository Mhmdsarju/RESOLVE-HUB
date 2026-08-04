import { useEffect } from "react";

import { useRefreshToken } from "../hooks/useRefreshToken";
import { me } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

interface Props {
  children: React.ReactNode;
}

export default function AuthInitializer({
  children,
}: Props) {
  const {
    setAccessToken,
    setUser,
    clearUser,
    setLoading,
    isLoading,
  } = useAuthStore();

  const refreshMutation =
    useRefreshToken();

  useEffect(() => {
    const initialize = async () => {
      try {
        const { accessToken } =
          await refreshMutation.mutateAsync();

        setAccessToken(accessToken);

        const user = await me();

        setUser(user);
      } catch {
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  if (isLoading) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#FAF6F0]
        "
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#4B3932]">
            ResolveHub
          </h1>

          <p className="mt-3 text-stone-500">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return children;
}