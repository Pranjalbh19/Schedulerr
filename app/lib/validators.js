import { z } from "zod";

export const usernameSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    // .regex(
    //   /^[a-zA-Z0-9_]+$/,
    //   "Username can only contain letters, numbers, and underscores"
    // ),
});


const daySchema = z.object({
  isAvailable: z.boolean(),
  startTime: z.string(),
  endTime: z.string(),
}).refine(
  (data) => {
    if (!data.isAvailable) return true;
    return data.startTime < data.endTime;
  },
  {
    message: "End time must be after start time",
    path: ["endTime"],
  }
);

export const availabilitySchema = z.object({
  monday: daySchema,
  tuesday: daySchema,
  wednesday: daySchema,
  thursday: daySchema,
  friday: daySchema,
  saturday: daySchema,
  sunday: daySchema,
  timeGap: z
    .number()
    .min(0, "Time gap must be non-negative")
    .max(1440, "Time gap can't exceed 24 hours (1440 minutes)"),
});

export const eventSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be 500 characters or less"),
  duration: z.number().int().positive("Duration must be a positive number"),

  isPrivate: z.boolean(),
});

export const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
  additionalInfo: z.string().optional(),
});



