"use client";

import { queryClient } from "@/app/providers";
import {
  createTransactionSchema,
  TCreateTransaction,
  TCreateTransactionInput,
  TCreateTransactionOutput,
} from "@/components/ui/dialog/dialog-transaction-create/schema";
import { useToast } from "@/hooks/use-toast";
import { Api } from "@/http/axios";
import { TransactionsGateway } from "@/http/transactions";
import { TErrorResponse } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CircleCheckBig, CircleX } from "lucide-react";
import { useForm } from "react-hook-form";
import TransacoesView from "./view";

export default function TransacoesPage() {
  const transactionsGateway = new TransactionsGateway(Api);
  const { toast } = useToast();

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

  const { data: transacoes, isLoading } = useQuery(
    ["transacoes"],
    () => transactionsGateway.getTransactions(),
    {
      keepPreviousData: true,
      staleTime: 60000,
    }
  );

  const { mutateAsync: createTransaction, isLoading: isCreating } = useMutation(
    {
      mutationFn: async (data: TCreateTransaction) =>
        transactionsGateway.createTransaction(data),
      onSuccess: async () => {
        await queryClient.invalidateQueries(["transacoes"]);
        toast({
          variant: "success",
          title: "Transação criada com sucesso",
          description: `Nova transação foi cadastrada`,
          icon: <CircleCheckBig />,
        });
      },
      onError: (error: AxiosError<TErrorResponse>) => {
        toast({
          variant: "destructive",
          title: "Erro ao criar transação",
          description:
            error.response?.data?.message ||
            "Um problema inesperado ocorreu, tente novamente",
          icon: <CircleX />,
        });
      },
    }
  );

  function parseCurrency(value: string): number {
    const numericValue = value.replace(/\./g, "").replace(/,/g, ".");
    return parseFloat(numericValue);
  }

  async function onCreate(data: TCreateTransaction) {
    await createTransaction({
      descricao: data.descricao,
      valor: parseCurrency(data.valor as string),
      categoriaId: data.categoriaId,
      data: data.data,
      tipo: data.tipo,
      custoFixo: data.tipo === "Saida" ? data.custoFixo : null,
      cartaoCredito: data.tipo === "Saida" ? data.cartaoCredito : null,
    });
  }

  return (
    <TransacoesView
      transacoes={transacoes?.items}
      loading={isLoading}
      formMethods={formMethods}
      onCreate={onCreate}
      isCreating={isCreating}
    />
  );
}
