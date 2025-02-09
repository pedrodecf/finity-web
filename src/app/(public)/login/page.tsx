"use client";

import { useToast } from "@/hooks/use-toast";
import { Api } from "@/http/axios";
import { UsersGateway } from "@/http/users";
import { TErrorResponse } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { CircleCheckBig, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  LoginSchema,
  loginSchema,
  LoginSchemaInput,
  LoginSchemaOutput,
} from "./schema";
import LoginView from "./view";

export default function LoginPage() {
  const usersGateway = new UsersGateway(Api);
  const { toast } = useToast();
  const router = useRouter();

  const formMethods = useForm<LoginSchemaInput, unknown, LoginSchemaOutput>({
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync: doLogin, isLoading } = useMutation({
    mutationFn: (data: { email: string; senha: string }) =>
      usersGateway.login(data),

    onSuccess: (data) => {
      localStorage.setItem("finity-logged", 'true');
      Cookies.set("finity-token", data.token, { expires: 7 });
      toast({
        variant: "success",
        title: "Login efetuado com sucesso!",
        description: "Seja bem-vindo ao finity",
        icon: <CircleCheckBig />,
      });
      window.location.href = "/dashboard";
    },

    onError: (error: AxiosError<TErrorResponse>) => {
      toast({
        variant: "destructive",
        title: "Erro ao efetuar login",
        description:
          error.response?.data?.message || "Um erro inesperado ocorreu",
        icon: <CircleX />,
      });
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    doLogin({
      email: data.email,
      senha: data.password,
    });
  };

  return (
    <LoginView
      formMethods={formMethods}
      onSubmit={onSubmit}
      loading={isLoading}
    />
  );
}
