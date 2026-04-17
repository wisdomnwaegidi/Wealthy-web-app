import { z } from "zod";

const nameSchema = z
  .string()
  .trim()
  .refine((val) => val.length > 0, {
    message: "Child first name is required",
  });

const surnameSchema = z
  .string()
  .trim()
  .refine((val) => val.length > 0, {
    message: "Child surname is required",
  });

const ageSchema = z.number({
  required_error: "Age is required",
  invalid_type_error: "Child age is required",
});

const addressSchema = z
  .string()
  .trim()
  .refine((val) => val.length > 0, {
    message: "Child home address is required",
  });

const parentNamesSchema = z
  .string()
  .trim()
  .refine((val) => val.length > 0, {
    message: "Parent names is required",
  });

const stateOfOriginSchema = z
  .string()
  .trim()
  .refine((val) => val.length > 0, {
    message: "State of origin is required",
  });

const childClassSchema = z
  .string()
  .trim()
  .refine((val) => val.length > 0, {
    message: "Child class is required",
  });

const parentsEmailSchema = z
  .string()
  .email({ message: "Parents email is required" });

const passwordSchema = z.string().refine((val) => val.length > 0, {
  message: "Password is required",
});

export const schema = z.object({
  childFirstName: nameSchema,
  childSurname: surnameSchema,
  childAge: ageSchema,
  homeAddress: addressSchema,
  parentNames: parentNamesSchema,
  stateOfOrigin: stateOfOriginSchema,
  childClass: childClassSchema,
  parentsEmail: parentsEmailSchema,
  password: passwordSchema,
});

export type RegisterFormData = z.infer<typeof schema>;
