import { z } from "zod";

export const memberEditSchema = z.object({
  name: z.string().min(1, {
    message: "Name Is required",
  }),
  decription: z.string().min(1, {
    message: "description is required",
  }),
  city: z.string().min(1, {
    message: "city is required",
  }),
  country: z.string().min(1, {
    message: "country is required",
  }),
});

export type MemberEditSchema = z.infer<typeof memberEditSchema>;
