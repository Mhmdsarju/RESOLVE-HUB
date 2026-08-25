import type { WarRoomStatus } from "../types/warRoom.types";

export const severityStyles = {
    LOW: "bg-green-100 text-green-700",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    HIGH: "bg-orange-100 text-orange-700",
    CRITICAL: "bg-red-100 text-red-700",
} as const;

export const warRoomStatusStyles: Record<WarRoomStatus, string> = {
    ACTIVE: "bg-blue-100 text-blue-700",
    CLOSED: "bg-stone-100 text-stone-700",
};

export const warRoomStatusOptions = [
    {
        value: "ACTIVE",
        label: "Active",
    },
    {
        value: "CLOSED",
        label: "Closed",
    },
] as const;

export const incidentStatusStyles = {
    OPEN: "bg-blue-100 text-blue-700",
    IN_PROGRESS: "bg-purple-100 text-purple-700",
    RESOLVED: "bg-green-100 text-green-700",
    CLOSED: "bg-stone-100 text-stone-700",
} as const;