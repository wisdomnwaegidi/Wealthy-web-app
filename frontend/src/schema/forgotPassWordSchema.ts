import { z } from "zod";

const parentsEmailSchema = z.string().refine((val) => val.length > 0, {
  message: "Email is required",
});

export const schema = z.object({
  parentsEmail: parentsEmailSchema,
});

export type ParentsFormData = z.infer<typeof schema>;
