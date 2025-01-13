import { z } from "zod";

export const eventSchema = z.object({
  name: z.string().min(1, { message: "Event name is required" }),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  location: z.string().min(1, { message: "Event location is required" }),
  maxAttendees: z
    .number()
    .min(1, { message: "Max attendees must be at least 1" })
    .max(1000, { message: "Max attendees cannot exceed 1000" }),
});

export type EventSchema = z.infer<typeof eventSchema>;
