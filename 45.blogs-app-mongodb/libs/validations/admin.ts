import z from "zod";

export const loginBodyValidation = z.object({
  username: z.string({ error: "required" }).trim().min(1),
  password: z.string({ error: "required" }).trim().min(1),
});
