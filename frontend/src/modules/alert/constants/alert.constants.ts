import { AlertTriangle, CheckCircle2, CircleAlert, } from "lucide-react";

import type { AlertSource, AlertStatus, } from "../types/alert.types";

export const ALERT_STATUS_CONFIG: Record<AlertStatus,
    {
        label: string;
        icon: typeof CircleAlert;
        className: string;
        dotClassName: string;
    }
> = {
    FIRING: {
        label: "Firing",
        icon: AlertTriangle,
        className: "bg-red-50 text-red-700",
        dotClassName: "bg-red-500",
    },

    RESOLVED: {
        label: "Resolved",
        icon: CheckCircle2,
        className: "bg-green-50 text-green-700",
        dotClassName: "bg-green-500",
    },
};

export const ALERT_SOURCE_CONFIG: Record<AlertSource, { label: string; }> = {
    MANUAL: {
        label: "Manual",
    },

    AUTOMATIC: {
        label: "Automatic",
    },
};