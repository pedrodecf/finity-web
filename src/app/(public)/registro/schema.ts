import { z } from "zod";

export const registroSchema = z.object({
   name: z.
      string({ required_error: 'Nome é obrigatório' })
      .min(3, 'Nome deve ter no mínimo 3 caracteres')
      .max(255, 'Nome deve ter no máximo 255 caracteres')
      .trim(),
   email: z
      .string({ required_error: 'E-mail é obrigatório' })
      .trim()
      .email('Insira um e-mail válido'),
   password: z
      .string({ required_error: 'Senha é obrigatório' })
      .min(6, 'Senha deve ter no mínimo 6 caracteres'),
   confirmPassword: z
      .string({ required_error: 'Confirmação é obrigatório' })
      .min(6, 'Senha deve ter no mínimo 6 caracteres'),
}).superRefine((data, ctx) => {
   if (data.password !== data.confirmPassword) {
      ctx.addIssue({
         code: z.ZodIssueCode.custom,
         message: 'As senhas não coincidem',
         path: ['confirmPassword'],
      });
   }
})

export type RegistroSchema = z.infer<typeof registroSchema>
export type RegistroSchemaInput = z.input<typeof registroSchema>
export type RegistroSchemaOutput = z.output<typeof registroSchema>