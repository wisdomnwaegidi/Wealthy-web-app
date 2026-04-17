import { z } from "zod";

const parentsEmailSchema = z
  .string()
  .email({ message: "Parents email is required" });

const passwordSchema = z.string().refine((val) => val.length > 0, {
  message: "Password is required",
});
const keepMeSignedInSchema = z.boolean().optional();

export const schema = z.object({
  parentsEmail: parentsEmailSchema,
  password: passwordSchema,
  keepMeSignedIn: keepMeSignedInSchema,
});

export type LoginFormData = z.infer<typeof schema>;
