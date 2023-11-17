import * as z from "zod";

export const SignupFormValidation = z.object({
  name: z.string().min(3, { message: "Too short for name" }),
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 charcters" }),
});
