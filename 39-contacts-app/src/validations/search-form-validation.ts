import { z } from "zod";

export const searchFormSchema = z.object({
  // password: z.string(),
  // repeatPassword: z.string(),
  search: z
    .string()
    .refine(
      (s) => {
        if (!s?.length) return true;
        if (s.length < 3) return false;
        return true;
      },
      { message: "String must contain at least 3 character(s)" }
    )
    .refine((s) => (!s?.length ? true : isNaN(Number(s))), {
      message: "Search can not be a number",
    }),
});
//   .superRefine((data, ctx) => {
//     if (data.password !== data.repeatPassword) {
//       ctx.addIssue({
//         path: ["repeatPassword"],
//         message: "Not same",
//         code: "custom",
//       });
//     }
//   });

export type searchFormSchemaType = z.infer<typeof searchFormSchema>;
