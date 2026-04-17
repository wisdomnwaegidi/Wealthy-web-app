import { z } from "zod";

export const subjectRegistrationSchema = z.object({
  term: z.enum(["First Term", "Second Term", "Third Term"], {
    errorMap: () => ({ message: "Please select a valid term" }),
  }),
  childClass: z.enum(
    [
      "Primary 1",
      "Primary 2",
      "Primary 3",
      "Primary 4",
      "Primary 5",
      "Primary 6",
    ],
    {
      errorMap: () => ({ message: "Please select a valid class" }),
    }
  ),
  subjects: z.array(z.string()).min(1, "Please select at least one subject"),
});

export type SubjectRegistrationFormData = z.infer<
  typeof subjectRegistrationSchema
>;
