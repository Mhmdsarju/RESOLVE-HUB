import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../api/userApi";

export function useUsers() {
  return useQuery({
    queryKey: ["users", "ENGINEER"],
    queryFn: async () => {
      const users = await getUsers();

      return users.filter((user) => user.role === "ENGINEER");
    },
  });
}