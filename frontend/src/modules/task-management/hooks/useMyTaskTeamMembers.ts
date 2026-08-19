import { useQueries } from "@tanstack/react-query";

import { getIncidentById } from "@/modules/incident/api/incidentApi";
import { getTeamMembers } from "@/modules/team-member/api/teamMemberApi";

import type { TeamMember } from "@/modules/team-member/types/teamMember.types";
import type { TaskTeamData } from "../types/task.types";



export function useMyTaskTeamMembers(
    tasks: {
        id: string;
        incidentId: string;
    }[],
    currentUserId?: string,
) {
    const incidentQueries = useQueries({
        queries: tasks.map((task) => ({
            queryKey: ["incident", task.incidentId],
            queryFn: () => getIncidentById(task.incidentId),
            enabled: Boolean(task.incidentId),
        })),
    });

    const teamIds = incidentQueries.map(
        (query) => query.data?.assignedTeamId,
    );

    const uniqueTeamIds = [
        ...new Set(
            teamIds.filter((teamId): teamId is string => Boolean(teamId),),
        ),
    ];

    const memberQueries = useQueries({
        queries: uniqueTeamIds.map((teamId) => ({
            queryKey: ["team-members", teamId, 1, 100, "",],
            queryFn: () => getTeamMembers(teamId, { page: 1, limit: 10, }),
            enabled: Boolean(teamId),
        })),
    });

    const teamMembersMap = new Map<string, TeamMember[]>();

    uniqueTeamIds.forEach(
        (teamId, index) => {
            teamMembersMap.set(
                teamId,
                memberQueries[index]?.data?.items ?? [],
            );
        },
    );

    const data: TaskTeamData[] = tasks.map(
        (task, index) => {
            const teamId =
                incidentQueries[index]?.data
                    ?.assignedTeamId;

            const members = teamId
                ? teamMembersMap.get(teamId) ?? []
                : [];

            const currentMember = members.find(
                (member) =>
                    member.userId === currentUserId,
            );

            return {
                taskId: task.id,
                teamId,
                members,
                isTeamLead:
                    currentMember?.role === "LEAD",
            };
        },
    );

    const isLoading = incidentQueries.some((query) => query.isLoading,) || memberQueries.some((query) => query.isLoading,);

    const isError = incidentQueries.some((query) => query.isError,) || memberQueries.some((query) => query.isError,);

    return {
        data,
        isLoading,
        isError,
    };
}