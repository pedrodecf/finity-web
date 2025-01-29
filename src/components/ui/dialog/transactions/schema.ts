import { z } from "zod";

export const createTransactionSchema = z.object({
  descricao: z
    .string({ required_error: "Campo obrigatório" })
    .min(3, "Mínimo 3 caracteres")
    .max(50, "Máximo 50 caracteres")
    .trim()
    .default(""),
  valor: z.union([
    z.coerce
      .string({ required_error: "Campo obrigatório" })
      .min(2, "Mínimo 2 caracteres")
      .trim()
      .default(""),
    z.coerce.number({ required_error: "Campo obrigatório" }),
  ]),
  categoriaId: z.coerce
    .number({ required_error: "Campo obrigatório" })
    .positive({ message: "Campo obrigatório" }),
  data: z.coerce
    .string({ required_error: "Campo obrigatório" })
    .min(1, "Campo obrigatório")
    .default(""),
  tipo: z.enum(["Entrada", "Saida"]).default("Entrada"),
  custoFixo: z.boolean().optional().nullable(),
  cartaoCredito: z.union([z.boolean(), z.string()]).optional().nullable(),
  parcelas: z
    .object({
      total: z.coerce.number().nullable(),
      atual: z.coerce.number().nullable(),
    })
    .nullable(),
});

export type TCreateTransaction = z.infer<typeof createTransactionSchema>;
export type TCreateTransactionInput = z.input<typeof createTransactionSchema>;
export type TCreateTransactionOutput = z.output<typeof createTransactionSchema>;

export const editTransactionSchema = z.object({
  descricao: z
    .string({ required_error: "Campo obrigatório" })
    .min(3, "Mínimo 3 caracteres")
    .max(50, "Máximo 50 caracteres")
    .trim(),
  valor: z.union([
    z.coerce
      .string({ required_error: "Campo obrigatório" })
      .min(2, "Mínimo 2 caracteres")
      .trim(),
    z.coerce.number({ required_error: "Campo obrigatório" }),
  ]),
  categoriaId: z.coerce
    .number({ required_error: "Campo obrigatório" })
    .positive({ message: "Campo obrigatório" }),
  data: z.coerce
    .string({ required_error: "Campo obrigatório" })
    .min(1, "Campo obrigatório"),
  tipo: z.enum(["Entrada", "Saida"]).default("Entrada"),
  custoFixo: z.boolean().optional().nullable(),
  cartaoCredito: z.union([z.boolean(), z.string()]).optional().nullable(),
  parcelas: z
    .object({
      total: z.coerce.number().optional().nullable(),
      atual: z.coerce.number().optional().nullable(),
    })
    .nullable(),
});

export type TEditTransaction = z.infer<typeof editTransactionSchema>;
