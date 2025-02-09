"use client";

import { queryClient } from "@/app/providers";
import {
  createTransactionSchema,
  TCreateTransaction,
  TCreateTransactionInput,
  TCreateTransactionOutput,
} from "@/components/dialog/transactions/schema";
import { ErrorRedirect } from "@/components/error-redirect";
import { TTransactions } from "@/components/tables/type";
import { useQueryParams } from "@/hooks/use-query-params";
import { useToast } from "@/hooks/use-toast";
import { Api } from "@/http/axios";
import { TransactionsGateway } from "@/http/transactions";
import { TErrorResponse } from "@/lib/types";
import { calcularPercentual } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CircleCheckBig, CircleX } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Fallback } from "./ui/fallback";
import TransacoesView from "./view";

export default function TransacoesPage() {
  const [transactionToEdit, setTransactionToEdit] =
    useState<TTransactions | null>(null);

  const [transactionToDelete, setTransactionToDelete] =
    useState<TTransactions | null>(null);

  const { queries } = useQueryParams();
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

  const {
    data: transacoes,
    isLoading,
    isError,
  } = useQuery(
    ["transacoes", queries],
    () => new TransactionsGateway(Api).getTransactions(queries),
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

  const { mutateAsync: deleteTransaction, isLoading: isDeleting } = useMutation(
    {
      mutationFn: async (id: string) =>
        transactionsGateway.deleteTransaction(id),
      onSuccess: async () => {
        await queryClient.invalidateQueries(["transacoes"]);
        toast({
          variant: "success",
          title: "Transação deletada com sucesso",
          description: "A transação foi removida da lista",
          icon: <CircleCheckBig />,
        });
      },
      onError: (error: AxiosError<TErrorResponse>) => {
        toast({
          variant: "destructive",
          title: "Erro ao deletar transação",
          description:
            error.response?.data?.message ||
            "Um problema inesperado ocorreu, tente novamente",
          icon: <CircleX />,
        });
      },
    }
  );

  const { mutateAsync: editTransaction, isLoading: isEditing } = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: TCreateTransaction;
    }) => transactionsGateway.editTransaction(id, data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(["transacoes"]);
      setTransactionToEdit((prev) => (prev ? { ...prev, ...data } : prev));
      toast({
        variant: "success",
        title: "Transação editada com sucesso",
        description: "A transação foi atualizada",
        icon: <CircleCheckBig />,
      });
    },
    onError: (error: AxiosError<TErrorResponse>) => {
      toast({
        variant: "destructive",
        title: "Erro ao editar transação",
        description:
          error.response?.data?.message ||
          "Um problema inesperado ocorreu, tente novamente",
        icon: <CircleX />,
      });
    },
  });

  function parseCurrency(value: string): number {
    const numericValue = value.replace(/[.,]/g, "");
    return Number(numericValue);
  }

  async function onCreate(data: TCreateTransaction): Promise<boolean> {
    await createTransaction({
      descricao: data.descricao,
      valor: parseCurrency(data.valor as string),
      categoriaId: data.categoriaId,
      data: data.data,
      tipo: data.tipo,
      custoFixo: data.tipo === "Saida" ? data.custoFixo : null,
      cartaoCredito: data.tipo === "Saida" ? data.cartaoCredito : null,
    });

    return true;
  }

  async function onDelete(id: string): Promise<boolean> {
    await deleteTransaction(id);
    return true;
  }

  async function onEdit(
    id: string,
    data: TCreateTransaction
  ): Promise<boolean> {
    await editTransaction({
      id,
      data: {
        descricao: data.descricao,
        valor: parseCurrency(data.valor as string),
        categoriaId: data.categoriaId,
        data: data.data,
        tipo: data.tipo,
        custoFixo: data.tipo === "Saida" ? data.custoFixo : null,
        cartaoCredito: data.tipo === "Saida" ? data.cartaoCredito : null,
      },
    });

    return true;
  }

  if (isError) {
    return <ErrorRedirect message="as transações" />;
  }

  if (!transacoes) {
    return <Fallback />;
  }

  const percentual = calcularPercentual(transacoes);

  return (
    <TransacoesView
      balance={transacoes?.balance}
      percentual={percentual}
      transacoes={transacoes?.items}
      loading={isLoading}
      formMethods={formMethods}
      onCreate={onCreate}
      isCreating={isCreating}
      onDelete={onDelete}
      isDeleting={isDeleting}
      onEdit={onEdit}
      isEditing={isEditing}
      transactionToEdit={transactionToEdit}
      setTransactionToEdit={setTransactionToEdit}
      transactionToDelete={transactionToDelete}
      setTransactionToDelete={setTransactionToDelete}
    />
  );
}
