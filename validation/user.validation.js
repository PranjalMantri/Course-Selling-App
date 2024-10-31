import { z } from "zod";

const UserSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password should be of at least 6 characters" })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password should include at least one upper case character",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Password should include at least one lower case character",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password should include at least one number",
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: "Password should contain at least one special character",
    }),
});

export { UserSchema };
