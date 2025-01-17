"use client";

import { Api } from "@/http/axios";
import { UsersGateway } from "@/http/users";
import { Usuario } from "@/http/users/types";
import { useQuery } from "@tanstack/react-query";

const usuariosGateway = new UsersGateway(Api);

export function useProfile() {
  return useQuery<Usuario>({
    queryKey: ["profile"],
    queryFn: () => usuariosGateway.profile(),
  });
}
