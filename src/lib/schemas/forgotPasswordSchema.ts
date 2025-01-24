import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "Password Must be 6 characters long",
    }),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
