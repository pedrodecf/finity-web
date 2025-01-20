'use client'

import { useForm } from "react-hook-form";
import RegistroView from "./view";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistroSchema, registroSchema, RegistroSchemaInput, RegistroSchemaOutput } from "./schema";

export default function RegistroPage() {
   const formMethods = useForm<
      RegistroSchemaInput,
      unknown,
      RegistroSchemaOutput
   >({
      mode: 'onSubmit',
      resolver: zodResolver(registroSchema)
   })

   const onSubmit = async (data: RegistroSchema) => {
   }

   return (
      <RegistroView
         formMethods={formMethods}
         onSubmit={onSubmit}
      />
   )
}