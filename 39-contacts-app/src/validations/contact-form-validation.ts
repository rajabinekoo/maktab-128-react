import { z } from "zod";

const validFormats = ["image/png", "image/jpg"];
const validSize = 2000000;

export const contactFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  avatar: z
    .custom<File>()
    .refine(
      (f) => {
        return Boolean(f);
      },
      { message: "Required" }
    )
    .refine(
      (f) => {
        if (!f) return false;
        return validFormats.includes(f.type);
      },
      { message: "Avatar must be png or jpg" }
    )
    .refine(
      (f) => {
        if (!f) return false;
        return f.size <= validSize;
      },
      { message: "Avatar size must be lower then 2mb" }
    ),
});

export type contactFormSchemaType = z.infer<typeof contactFormSchema>;
