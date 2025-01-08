import { z } from "zod";

export const patientSchema = z.object({
  name: z.string(),
  cpf: z.string(),
  birthdate: z.string(),
  clinicId: z.string(),
});
