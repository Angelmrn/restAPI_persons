import { z } from "zod";

export const createUserSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(2, "Username must be at least 2 characters")
    .max(250),

  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
});

export const updateUserSchema = createUserSchema.partial();
