import * as z from "zod";

export const addBlogValidation = z.object({
  name: z.string({ error: "required" }).trim().min(5).max(30),
  body: z.string({ error: "required" }).trim().min(10).max(1200),
});

export const updateBlogValidation = z
  .object({
    name: z.string().trim().min(5).max(30).optional(),
    body: z.string().trim().min(10).max(1200).optional(),
  })
  .superRefine((data, ctx) => {
    const emptyBody = Object.keys(data).length === 0;
    if (emptyBody) {
      ctx.addIssue({
        path: ["name", "body"],
        message: "Body should not be empty"
      });
    }
  });
