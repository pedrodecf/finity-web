import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import { LoginSchema, LoginSchemaInput, LoginSchemaOutput } from "./schema";

type LoginViewProps = {
  formMethods: UseFormReturn<LoginSchemaInput, unknown, LoginSchemaOutput>;
  onSubmit: (data: LoginSchema) => Promise<void>;
  loading?: boolean;
};

export default function LoginView({
  formMethods,
  onSubmit,
  loading,
}: LoginViewProps) {
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
        <Button type="submit" size="lg" disabled={loading}>
          Entrar
        </Button>
        <p className="text-sm text-center mt-4">
          Não tem conta?{" "}
          <Link className="underline font-semibold" href="/registro">
            Crie uma gratuita!
          </Link>
        </p>
      </form>
    </div>
  );
}
