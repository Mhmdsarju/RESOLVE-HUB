import { z } from "zod";

export const createIncidentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Incident title is required")
    .max(200, "Incident title cannot exceed 200 characters"),

  description: z
    .string()
    .trim()
    .max(2000, "Description cannot exceed 2000 characters")
    .optional()
    .or(z.literal("")),

  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),

  priority: z.enum(["P1", "P2", "P3", "P4"]),

  type: z.enum(["MANUAL", "AUTOMATED"]),

  assignedTeamId: z
    .string()
    .trim()
    .min(1, "Assigned team is required"),
});

export type CreateIncidentFormData = z.infer<typeof createIncidentSchema>;