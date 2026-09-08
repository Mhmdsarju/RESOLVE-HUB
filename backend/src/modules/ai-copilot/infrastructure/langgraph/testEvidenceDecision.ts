import "dotenv/config";

import { IncidentCopilotState } from "./state/IncidentCopilotState";
import { evaluateEvidence } from "./edges/EvidenceDecision";

function testEvidenceDecision() {

    const enoughEvidenceState = {
        incidentId: "test",
        organizationId: "test",
        incident: {
            title: "Test",
            description: null,
            severity: "MEDIUM",
            priority: "P2",
            status: "OPEN",
            type: "MANUAL",
        },
        retrievedDocuments: [],
        evidence: [
            {
                id: "test",
                documentId: "test",
                content: "Test evidence",
                metadata: null,
                similarity: 0.8,
            },
        ],
        summary: null,
        rootCause: null,
        recommendation: null,
        retryCount: 0,
    } as typeof IncidentCopilotState.State;

    const retryState = {
        ...enoughEvidenceState,
        evidence: [],
        retryCount: 0,
    };

    const insufficientState = {
        ...enoughEvidenceState,
        evidence: [],
        retryCount: 2,
    };

    console.log("Enough evidence:", evaluateEvidence(enoughEvidenceState));

    console.log("Retry:", evaluateEvidence(retryState));

    console.log("Insufficient evidence:", evaluateEvidence(insufficientState));
}

testEvidenceDecision();