import { useIncident } from "@/modules/incident/hooks/useIncident";

import OrgAdminIncidentCard from "./OrgAdminIncidentCard";

interface OrgAdminIncidentSectionProps {
    incidentId: string;
}

export default function OrgAdminIncidentSection({    incidentId,}: OrgAdminIncidentSectionProps) {

    const {
        data: incident,
        isLoading,
        isError,
    } = useIncident(incidentId);

    if (isLoading) {
        return (
            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-stone-500">
                    Loading incident information...
                </p>
            </div>
        );
    }

    if (isError || !incident) {
        return (
            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-sm text-stone-500">
                    Incident information is unavailable.
                </p>
            </div>
        );
    }

    return (
        <OrgAdminIncidentCard
            incident={incident}
        />
    );
}