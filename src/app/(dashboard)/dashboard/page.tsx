"use client";

import DashboardView from "./view";
import { useQuery } from "@tanstack/react-query";
import { TransactionsGateway } from "@/http/transactions";
import { Api } from "@/http/axios";

export default function DashboardPage() {
  const transactionsGateway = new TransactionsGateway(Api);

  const { data: transacoes, isLoading: isLoadingTransactions, isError } = useQuery(
    ["transacoes"],
    () => transactionsGateway.getTransactions(),
    {
      keepPreviousData: true,
      staleTime: 60000,
    }
  );

  if (!transacoes) {
    return null
  }

  const percentual = (transacoes?.balance.total / transacoes?.balance.totalEntrada) * 100;

  return (
    <DashboardView
      balance={transacoes.balance}
      isLoadingTransactions={isLoadingTransactions}
      percentual={percentual}
      transactions={transacoes.items}
    />
  );
}
