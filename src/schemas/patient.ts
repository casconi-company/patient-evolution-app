import { z } from "zod";

export const patientSchema = z.object({
  name: z.string(),
  cpf: z.string(),
  birthdate: z.string(),
  clinic: z.string(),
  documentNumber: z.string().optional(),
});

export const evolutionPatientSchema = z.object({
  date: z.string(),
  time: z.string(),
  evolution: z.string(),
  therapistId: z.string(),
  clinic: z.string(),
  file: z
    .any()
    .refine(
      (value) => value instanceof FileList && value.length > 0,
      "Nenhum arquivo foi enviado"
    )
    .refine(
      (value) => value instanceof FileList && value[0].size < 15 * 1024 * 1024,
      "O arquivo deve ter no máximo 15MB"
    )
    .refine(
      (value) =>
        value instanceof FileList &&
        ["image/jpeg", "image/png"].includes(value[0].type),
      "Formato de arquivo inválido"
    ),
});
