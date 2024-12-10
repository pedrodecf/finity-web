import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import { LoginSchema, LoginSchemaInput, LoginSchemaOutput } from "./schema";
import Image from "next/image";

type LoginViewProps = {
   formMethods: UseFormReturn<
      LoginSchemaInput,
      unknown,
      LoginSchemaOutput
   >
   onSubmit: (data: LoginSchema) => Promise<void>
}

export default function LoginView({ formMethods, onSubmit }: LoginViewProps) {
   const {
      handleSubmit,
      control,
      formState: { errors }
   } = formMethods
   return (
      <div className="min-h-screen max-h-full bg-gradient-to-r from-background to-card flex items-center justify-center">
         <form className="rounded-lg bg-card-foreground text-card px-6 py-8 flex flex-col gap-4 w-full max-w-sm shadow-md" onSubmit={handleSubmit(onSubmit)}>
            <Image src="/fnyi-logo-black.svg" alt="Logo" width={80} height={100} className=""/>
            <h1 className="text-2xl font-bold mb-2">Acesse sua conta</h1>
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
            <Button type="submit">Entrar</Button>
            <p className="text-sm text-center mt-4">Não tem conta? <Link className="underline font-semibold" href="/registro">Crie uma gratuita!</Link></p>
         </form>
      </div>
   )
}