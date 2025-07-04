import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});
