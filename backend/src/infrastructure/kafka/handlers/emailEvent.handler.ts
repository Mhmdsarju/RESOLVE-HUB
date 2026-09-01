import { IOrganizationEmailService } from "@/modules/organization/domain/interfaces/IOrganizationEmailService";

export class EmailEventHandler {

    constructor(
        private readonly organizationEmailService: IOrganizationEmailService,
    ) { }

    async handle(message: string): Promise<void> {

        const event = JSON.parse(message);

        console.log("Email Event Received: ", event);

        if (event.event === "ORGANIZATION_APPROVED") {
            await this.organizationEmailService.sendOrganizationApprovedEmail(
                event.email,
                event.organizationName,
            );
        }

        if (event.event === "ORGANIZATION_REJECTED") {
            await this.organizationEmailService.sendOrganizationRejectedEmail(
                event.email,
                event.organizationName,
                event.reason,
            );
        }

        if (event.event === "ORGANIZATION_VERIFICATION_SUBMITTED") {
            await this.organizationEmailService.sendVerificationSubmittedEmail(
                event.email,
                event.organizationName,
            );
        }

    }

}