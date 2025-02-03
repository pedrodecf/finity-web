"use client";

import { useToast } from "@/hooks/use-toast";
import { Api } from "@/http/axios";
import { UsersGateway } from "@/http/users";
import { TErrorResponse } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CircleCheckBig, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  RegistroSchema,
  registroSchema,
  RegistroSchemaInput,
  RegistroSchemaOutput,
} from "./schema";
import RegistroView from "./view";

export default function RegistroPage() {
  const usersGateway = new UsersGateway(Api);
  const { toast } = useToast();
  const router = useRouter();

  const formMethods = useForm<
    RegistroSchemaInput,
    unknown,
    RegistroSchemaOutput
  >({
    mode: "onSubmit",
    resolver: zodResolver(registroSchema),
  });

  const { mutateAsync: doRegister, isLoading } = useMutation({
    mutationFn: (data: { nome: string; email: string; senha: string }) =>
      usersGateway.register(data),

    onSuccess: () => {
      toast({
        variant: "success",
        title: "Registro efetuado com sucesso!",
        description: "Faça login para acessar sua conta",
        icon: <CircleCheckBig />,
      });
      router.push("/login");
    },

    onError: (error: AxiosError<TErrorResponse>) => {
      toast({
        variant: "destructive",
        title: "Erro ao efetuar registro",
        description:
          error.response?.data?.message || "Um erro inesperado ocorreu",
        icon: <CircleX />,
      });
    },
  });

  async function onSubmit(data: RegistroSchema) {
    doRegister({ nome: data.name, email: data.email, senha: data.password });
  }

  return (
    <RegistroView
      formMethods={formMethods}
      onSubmit={onSubmit}
      loading={isLoading}
    />
  );
}
