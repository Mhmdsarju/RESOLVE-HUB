import { z } from "zod";

export const editTaskSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Task title is required")
        .max(100, "Task title must be less than 100 characters")
        .regex(
            /^[a-zA-Z0-9 ]+$/,
            "Task title can contain only letters, numbers, and spaces",
        ),

    description: z
        .string()
        .trim()
        .max(
            500,
            "Description must be less than 500 characters",
        )
        .optional(),

    priority: z.enum([
        "LOW",
        "MEDIUM",
        "HIGH",
    ]),

    dueDate: z
        .string()
        .optional()
        .refine(
            (value) => {
                if (!value) {
                    return true;
                }

                const selectedDate = new Date(
                    `${value}T00:00:00`,
                );

                const today = new Date();

                today.setHours(0, 0, 0, 0);

                return selectedDate >= today;
            },
            {
                message: "Due date cannot be in the past",
            },
        ),
});

export type EditTaskFormValues = z.infer<
    typeof editTaskSchema
>;