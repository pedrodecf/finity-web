import { z } from "zod";

export const loginSchema = z.object({
   email: z
      .string({ required_error: 'E-mail é obrigatório' })
      .trim()
      .email('Insira um e-mail válido'),
   password: z
      .string({ required_error: 'Senha é obrigatório' })
      .min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

export type LoginSchema = z.infer<typeof loginSchema>
export type LoginSchemaInput = z.input<typeof loginSchema>
export type LoginSchemaOutput = z.output<typeof loginSchema>