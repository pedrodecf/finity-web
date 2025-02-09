import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import {
  RegistroSchema,
  RegistroSchemaInput,
  RegistroSchemaOutput,
} from "./schema";

type RegistroViewProps = {
  formMethods: UseFormReturn<
    RegistroSchemaInput,
    unknown,
    RegistroSchemaOutput
  >;
  onSubmit: (data: RegistroSchema) => Promise<void>;
  loading?: boolean;
};

export default function RegistroView({
  formMethods,
  onSubmit,
  loading,
}: RegistroViewProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;
  return (
    <div className="min-h-screen max-h-full linear-bg flex items-center justify-center">
      <form
        className="rounded-lg bg-card-foreground text-card p-8 flex flex-col gap-4 w-full max-w-md shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <a href="/" className="w-fit">
          <Image
            src="/finity-black.svg"
            alt="Logo"
            width={180}
            height={100}
            className="flex self-center mb-6"
          />
        </a>
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
        <Button type="submit" size="lg" disabled={loading}>
          Criar conta
        </Button>
        <p className="text-sm text-center mt-4">
          Já possui uma conta?{" "}
          <Link className="underline font-semibold" href="/login">
            Faça login!
          </Link>
        </p>
      </form>
    </div>
  );
}
