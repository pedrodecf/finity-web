"use client";

import { Api } from "@/http/axios";
import { UsersGateway } from "@/http/users";
import { useSessionStore } from "@/stores/session";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const authGateway = new UsersGateway(Api);

export function useLogin() {
  const router = useRouter();
  const setUser = useSessionStore((state) => state.setUser);

  const mutation = useMutation({
    mutationFn: (credentials: { email: string; senha: string }) =>
      authGateway.login(credentials),

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    },

    onError: (error) => {
      console.error("Erro no login", error);
    },
  });

  return mutation;
}
