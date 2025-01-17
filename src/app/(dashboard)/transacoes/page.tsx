"use client";

import { fetchTransactions } from "@/components/tables/transactions-mock";
import {
  createTransactionSchema,
  TCreateTransactionInput,
  TCreateTransactionOutput,
} from "@/components/ui/dialog/dialog-transaction-create/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TransacoesView from "./view";

export default function TransacoesPage() {
  const formMethods = useForm<
    TCreateTransactionInput,
    unknown,
    TCreateTransactionOutput
  >({
    mode: "onSubmit",
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      descricao: "",
      valor: "",
      categoriaId: 0,
      data: "",
      tipo: "Entrada",
      custoFixo: true,
      cartaoCredito: false,
    },
  });

  const transacoes = fetchTransactions();
  const transacoesOrdenadas = transacoes.sort((a, b) => {
    return new Date(b.data).getTime() - new Date(a.data).getTime();
  });
  return (
    <TransacoesView
      transacoes={transacoes}
      transacoesOrdenadas={transacoesOrdenadas}
      formMethods={formMethods}
    />
  );
}
