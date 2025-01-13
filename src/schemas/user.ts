import { z } from "zod";

export const userSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email should be at least 5 characters long")
    .max(100, "Email should not exceed 100 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long")
    .regex(
      /[A-Za-z0-9]/,
      "Password must include at least one letter and one number"
    ),
});

export type UserSchema = z.infer<typeof userSchema>;
