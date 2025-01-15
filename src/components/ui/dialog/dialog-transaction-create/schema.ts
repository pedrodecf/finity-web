import { z } from "zod";

export const createTransactionSchema = z.object({
  descricao: z
    .string({ required_error: "Campo obrigatório" })
    .min(3, "Mínimo 3 caracteres")
    .max(50, "Máximo 50 caracteres")
    .trim(),
  valor: z.number().positive(),
  categoriaId: z.number(),
  data: z.date(),
  tipo: z.enum(["Entrada", "Saida"]),
  custoFixo: z.boolean().optional(),
});

export type TCreateTransaction = z.infer<typeof createTransactionSchema>;
export type TCreateTransactionInput = z.input<typeof createTransactionSchema>;
export type TCreateTransactionOutput = z.output<typeof createTransactionSchema>;
