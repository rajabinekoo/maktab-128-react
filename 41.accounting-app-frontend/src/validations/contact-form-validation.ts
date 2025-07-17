import { z } from "zod";

const validFormats = ["image/png", "image/jpg", "image/jpeg"];
const validSize = 2000000;

export const getContactFormSchema = (editingMode = false) => {
  return z.object({
    name: z.string().min(3),
    email: z.string().email(),
    avatar: z
      .custom<File>()
      .refine(
        (f) => {
          if (editingMode) return true;
          return Boolean(f);
        },
        { message: "Required" }
      )
      .refine(
        (f) => {
          if (!f) return editingMode;
          return validFormats.includes(f.type);
        },
        { message: "Avatar must be png or jpg" }
      )
      .refine(
        (f) => {
          if (!f) return editingMode;
          return f.size <= validSize;
        },
        { message: "Avatar size must be lower then 2mb" }
      ),
  });
};

export type contactFormSchemaType = {
  name: string;
  email: string;
  avatar: File;
};
