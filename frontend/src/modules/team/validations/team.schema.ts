import { z } from "zod";

export const teamSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Team name must be at least 2 characters")
        .max(100, "Team name must not exceed 100 characters"),
});

export type TeamFormData = z.infer<typeof teamSchema>;