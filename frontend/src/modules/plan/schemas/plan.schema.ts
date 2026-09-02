import { z } from "zod";


export const createPlanSchema = z.object({
  name: z.enum(["FREE", "PREMIUM"]),

  price: z.coerce
    .number()
    .min(0, "Price cannot be negative"),

  durationDays: z.coerce
    .number()
    .int("Duration must be a whole number")
    .positive("Duration must be greater than 0")
    .nullable(),

  maxProjects: z.coerce
    .number()
    .int("Max projects must be a whole number")
    .positive("Max projects must be greater than 0")
    .nullable(),

  isActive: z.boolean(),
});


export const updatePlanSchema = z.object({
  name: z.enum(["FREE", "PREMIUM"]).optional(),

  price: z.coerce
    .number()
    .min(0, "Price cannot be negative")
    .optional(),

  durationDays: z.coerce
    .number()
    .int("Duration must be a whole number")
    .positive("Duration must be greater than 0")
    .nullable()
    .optional(),

  maxProjects: z.coerce
    .number()
    .int("Max projects must be a whole number")
    .positive("Max projects must be greater than 0")
    .nullable()
    .optional(),

  isActive: z.boolean().optional(),
});