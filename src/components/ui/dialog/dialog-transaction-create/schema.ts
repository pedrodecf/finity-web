import { z } from "zod";

export const createTransactionSchema = z.object({
  descricao: z
    .string({ required_error: "Campo obrigatório" })
    .min(3, "Mínimo 3 caracteres")
    .max(50, "Máximo 50 caracteres")
    .trim()
    .default(""),
  valor: z.coerce
    .string({ required_error: "Campo obrigatório" })
    .min(2, "Mínimo 2 caracteres")
    .trim()
    .default(""),
  categoriaId: z.coerce
    .number({ required_error: "Campo obrigatório" })
    .positive({ message: "Campo obrigatório" }),
  data: z.coerce
    .string({ required_error: "Campo obrigatório" })
    .min(1, "Campo obrigatório")
    .default(""),
  tipo: z.enum(["Entrada", "Saida"]).default("Entrada"),
  custoFixo: z.boolean().optional(),
});

export type TCreateTransaction = z.infer<typeof createTransactionSchema>;
export type TCreateTransactionInput = z.input<typeof createTransactionSchema>;
export type TCreateTransactionOutput = z.output<typeof createTransactionSchema>;
