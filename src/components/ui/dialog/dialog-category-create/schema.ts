import { z } from "zod";

export const createCategorySchema = z.object({
  nome: z
    .string({ required_error: "Campo obrigatório" })
    .min(3, "Mínimo 3 caracteres")
    .max(50, "Máximo 50 caracteres")
    .trim()
    .default(""),
  avatar: z.coerce
    .string({ required_error: "Campo obrigatório" })
    .min(1, "Campo obrigatório")
    .trim()
    .default(""),
  hex: z.coerce
    .string({ required_error: "Campo obrigatório" })
    .min(1, "Campo obrigatório")
    .trim()
    .default(""),
});

export type TCreateCategory = z.infer<typeof createCategorySchema>;
export type TCreateCategoryInput = z.input<typeof createCategorySchema>;
export type TCreateCategoryOutput = z.output<typeof createCategorySchema>;
