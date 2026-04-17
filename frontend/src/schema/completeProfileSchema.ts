import { z } from "zod";

export const completeProfileSchema = z.object({
  childFirstName: z.string().min(1, "Child first name is required"),
  childSurname: z.string().min(1, "Child surname is required"),
  childAge: z
    .number({ invalid_type_error: "Age is required" })
    .min(1, "Age must be at least 1"),
  homeAddress: z.string().min(1, "Home address is required"),
  parentNames: z.string().min(1, "Parent names are required"),
  stateOfOrigin: z.string().min(1, "State of origin is required"),
  childClass: z.string().min(1, "Child class is required"),
});

export type CompleteProfileFormData = z.infer<typeof completeProfileSchema>;
