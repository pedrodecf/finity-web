import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import { RegistroSchema, RegistroSchemaInput, RegistroSchemaOutput } from "./schema";
import Image from "next/image";

type RegistroViewProps = {
   formMethods: UseFormReturn<
      RegistroSchemaInput,
      unknown,
      RegistroSchemaOutput
   >
   onSubmit: (data: RegistroSchema) => Promise<void>
}

export default function RegistroView({ formMethods, onSubmit }: RegistroViewProps) {
   const {
      handleSubmit,
      control,
      formState: { errors }
   } = formMethods
   return (
      <div className="min-h-screen max-h-full bg-gradient-to-r from-background to-card flex items-center justify-center">
         <form className="rounded-lg bg-card-foreground text-card px-6 py-8 flex flex-col gap-4 w-full max-w-sm shadow-md" onSubmit={handleSubmit(onSubmit)}>
            <Image src="/fnyi-logo-black.svg" alt="Logo" width={80} height={100} />
            <h1 className="text-2xl font-bold mb-2">Crie uma conta</h1>
            <Input
               name="name"
               label="Nome"
               control={control}
               helperText={errors.name?.message}
            />
            <Input
               name="email"
               label="E-mail"
               control={control}
               helperText={errors.email?.message}
            />
            <Input
               name="password"
               label="Senha"
               control={control}
               helperText={errors.password?.message}
               type="password"
            />
            <Input
               name="confirmPassword"
               label="Confirme sua senha"
               control={control}
               helperText={errors.confirmPassword?.message}
               type="password"
            />
            <Button type="submit">Criar conta</Button>
            <p className="text-sm text-center mt-4">Já possui uma conta? <Link className="underline font-semibold" href="/login">Faça login!</Link></p>
         </form>
      </div>
   )
}