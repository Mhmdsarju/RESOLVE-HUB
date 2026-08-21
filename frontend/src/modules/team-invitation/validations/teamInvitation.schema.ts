import { z } from "zod";

export const createTeamInvitationSchema = z.object({
    invitedEmail: z.string().email("Please enter a valid email address"),
    role: z.enum(["MEMBER", "LEAD"]),
});

export type CreateTeamInvitationFormData = z.infer<typeof createTeamInvitationSchema>;