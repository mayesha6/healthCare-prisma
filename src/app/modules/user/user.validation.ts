import z from "zod";

const createPatientValidationSchema = z.object({
  password: z.string(),
  patient: z.object({
    name: z.string().nonempty("Name is requires."),
    email: z.string().nonempty("Email is requires."),
    address: z.string().optional(),
  }),
});
const createDoctorValidationSchema = z.object({
  password: z.string(),
  doctor: z.object({
    name: z.string().nonempty("Name is requires."),
    email: z.string().nonempty("Email is requires."),
    address: z.string().optional(),
    contactNumber: z.string().nonempty("Contact number is requires."),
    registrationNumber: z.string().nonempty("Registration number is requires."),
    experience: z.number().nonoptional(),
    gender: z.string().nonempty("gender is requires."),
    appointmentFee: z.number().nonoptional(),
    qualification: z.string().nonempty("qualification is requires."),
    currentWorkingPlace: z.string().optional(),
    designation: z.string().optional(),
  }),
});
const createAdminValidationSchema = z.object({
  password: z.string(),
  admin: z.object({
    name: z.string().nonempty("Name is requires."),
    email: z.string().nonempty("Email is requires."),
    contactNumber: z.string().nonempty("Contact number is requires.")
  }),
});
export const UserValidation = {
  createPatientValidationSchema,
  createDoctorValidationSchema,
  createAdminValidationSchema
};


