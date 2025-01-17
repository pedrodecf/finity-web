"use client";

import { useLogin } from "@/hooks/use-login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  LoginSchema,
  loginSchema,
  LoginSchemaInput,
  LoginSchemaOutput,
} from "./schema";
import LoginView from "./view";

export default function LoginPage() {
  const { mutate: doLogin, isLoading, isError, error } = useLogin();

  const formMethods = useForm<LoginSchemaInput, unknown, LoginSchemaOutput>({
    mode: "onSubmit",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    doLogin({
      email: data.email,
      senha: data.password,
    });
  };

  return <LoginView formMethods={formMethods} onSubmit={onSubmit} />;
}
