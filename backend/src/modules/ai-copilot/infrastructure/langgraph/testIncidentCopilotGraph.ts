import "dotenv/config";
import { aiModule } from "@/config/inversify.config";

async function testIncidentCopilotGraph() {

    const result = await aiModule.incidentCopilotGraph.invoke({
        incidentId: "cmtsjp7vb000a4pb59orpoh9q",
        organizationId: "70ad9f14-5ab1-4083-8de6-5a1291bfd650",

        incident: {
            title: "",
            description: null,
            severity: "",
            priority: "",
            status: "",
            type: "",
        },

        retrievedDocuments: [],
        evidence: [],
        rootCause: null,
        recommendation: null,
        retryCount: 0,
    });

    console.log(result);

}

testIncidentCopilotGraph();