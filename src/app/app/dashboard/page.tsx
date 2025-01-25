"use client";

import { useQueryParams } from "@/hooks/use-query-params";
import { Api } from "@/http/axios";
import { TransactionsGateway } from "@/http/transactions";
import { useQuery } from "@tanstack/react-query";
import DashboardView from "./view";

export default function DashboardPage() {
  const { queries } = useQueryParams();

  const { data: transacoes, isLoading: isLoadingTransactions } = useQuery(
    ["transacoes", queries],
    () => new TransactionsGateway(Api).getTransactions(queries),
    {
      keepPreviousData: true,
      staleTime: 60000,
    }
  );

  if (!transacoes) return null;

  const percentual =
    (transacoes.balance.total / transacoes.balance.totalEntrada) * 100;

  return (
    <DashboardView
      transactions={transacoes.items}
      balance={transacoes.balance}
      isLoadingTransactions={isLoadingTransactions}
      percentual={percentual}
    />
  );
}
