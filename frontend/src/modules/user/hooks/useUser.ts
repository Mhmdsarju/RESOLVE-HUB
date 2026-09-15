import { useQuery } from "@tanstack/react-query";

import { getUserById } from "../api/user.api";

export const useUser = (userId: string) => {

    return useQuery({

        queryKey: ["user", userId],

        queryFn: () => getUserById(userId),

        enabled: Boolean(userId),

    });

};