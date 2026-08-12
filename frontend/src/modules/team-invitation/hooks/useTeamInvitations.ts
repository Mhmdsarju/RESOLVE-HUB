import { useQuery } from "@tanstack/react-query";

import { getTeamInvitations } from "../api/teamInvitationApi";

export function useTeamInvitations(teamId: string) {
  return useQuery({
    queryKey: ["team-invitations", teamId],
    queryFn: () => getTeamInvitations(teamId),
    enabled: Boolean(teamId),
    refetchInterval: 3000,
  });
}