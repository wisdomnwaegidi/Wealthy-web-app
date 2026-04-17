// utils/newsletterSchema.ts
import { z } from "zod";

export const newsletterSchema = z.object({
  parentsEmail: z.string().email("Please enter a valid email address"),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
