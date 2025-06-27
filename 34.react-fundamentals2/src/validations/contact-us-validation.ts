import { z } from "zod";

const ContactUsForm = z.object({
  firstname: z.string().min(3),
  lastname: z.string().min(3),
  address: z.string().min(5),
  email: z.string().regex(/^[a-z]\w{4,}@gmail.com$/gi, "Invalid email address"),
  // email: z.string().email(),
});

type ContactUsType = {
  firstname: string;
  lastname: string;
  address: string;
  email: string;
}

export const contactUsFormValidation = (values: ContactUsType) => {
  return ContactUsForm.parse(values);
};


const a: ContactUsType = {
  firstname: "ali",
  lastname: "rajabi",
  address: "test",
  email: "test@gmail.com"
}