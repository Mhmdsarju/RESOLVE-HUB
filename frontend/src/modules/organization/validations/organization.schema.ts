import { z } from "zod";

export const organizationProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Organization name must be at least 2 characters")
    .max(100, "Organization name is too long"),

  industry: z
    .string()
    .trim()
    .min(2, "Industry is required")
    .max(100, "Industry is too long"),

  companySize: z
    .string()
    .trim()
    .min(1, "Company size is required"),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description must be less than 500 characters"),

  website: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .trim()
    .min(7, "Phone number must be at least 7 characters")
    .max(20, "Phone number is too long"),

  country: z
    .string()
    .trim()
    .min(2, "Country is required")
    .max(100, "Country is too long"),

  state: z
    .string()
    .trim()
    .min(2, "State is required")
    .max(100, "State is too long"),

  city: z
    .string()
    .trim()
    .min(2, "City is required")
    .max(100, "City is too long"),

  address: z
    .string()
    .trim()
    .min(5, "Address is required")
    .max(300, "Address is too long"),
});

export type OrganizationProfileFormData = z.infer<
  typeof organizationProfileSchema
>;