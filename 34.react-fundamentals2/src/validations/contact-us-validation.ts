import { z } from "zod";

const ContactUsForm = z.object({
  firstname: z.string().min(3),
  lastname: z.string().min(3),
  address: z.string().min(5),
  email: z.string().email(),
});

type ContactUsType = z.infer<typeof ContactUsForm>;

export const contactUsFormValidation = (values: ContactUsType) => {
  return ContactUsForm.parse(values);
};
