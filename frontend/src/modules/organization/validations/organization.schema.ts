import { z } from "zod";

export const organizationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Organization name must be at least 3 characters")
    .max(100, "Organization name must not exceed 100 characters"),

  industry: z
    .string()
    .trim()
    .min(1, "Please select an industry"),

  companySize: z
    .string()
    .trim()
    .min(1, "Please select a company size"),
});

export type OrganizationFormData = z.infer<
  typeof organizationSchema
>;