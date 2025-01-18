"use client";

import { Api } from "@/http/axios";
import { UsersGateway } from "@/http/users";
import { TErrorResponse } from "@/lib/types";
import { useSessionStore } from "@/stores/session";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CircleCheckBig, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";

const authGateway = new UsersGateway(Api);

export function useLogin() {
  const router = useRouter();
  const setUser = useSessionStore((state) => state.setUser);
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (credentials: { email: string; senha: string }) =>
      authGateway.login(credentials),

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast({
        variant: "success",
        title: "Login efetuado com sucesso",
        description: "Seja bem-vindo ao finity™",
        icon: <CircleCheckBig />,
      });
      router.push("/dashboard");
    },

    onError: (error: AxiosError<TErrorResponse>) => {
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description:
          error.response?.data?.message ||
          "Um problema inesperado ocorreu, tente novamente",
        icon: <CircleX />,
      });
    },
  });

  return mutation;
}
