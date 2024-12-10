'use client'

import { useForm } from "react-hook-form";
import LoginView from "./view";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema, LoginSchemaInput, LoginSchemaOutput } from "./schema";

export default function LoginPage() {
   const formMethods = useForm<
      LoginSchemaInput,
      unknown,
      LoginSchemaOutput
   >({
      mode: 'onSubmit',
      resolver: zodResolver(loginSchema)
   })

   const onSubmit = async (data: LoginSchema) => {
      console.log(data)
   }

   return (
      <LoginView
         formMethods={formMethods}
         onSubmit={onSubmit}
      />
   )
}