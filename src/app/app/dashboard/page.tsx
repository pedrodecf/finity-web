"use client";

import { useQuery } from "@tanstack/react-query";
import { TransactionsGateway } from "@/http/transactions";
import { Api } from "@/http/axios";
import DashboardView from "./view";
import { useQueryParams } from "@/hooks/use-query-params";

export default function DashboardPage() {
  const { queries, setQueries } = useQueryParams();

  const { data: transacoes, isLoading: isLoadingTransactions } = useQuery(
    ["transacoes", queries],
    () => new TransactionsGateway(Api).getTransactions(queries),
    {
      keepPreviousData: true,
      staleTime: 60000,
    }
  );

  if (!transacoes) return null;

  const percentual = (transacoes.balance.total / transacoes.balance.totalEntrada) * 100;

  function handleChangePeriod(period: "mesAtual" | "mesPassado" | "anoAtual") {
    if (period === "mesAtual") {
      setQueries({ periodoDe: "01012025", periodoAte: "31012025" });
    }
    if (period === "mesPassado") {
      setQueries({ periodoDe: "01122024", periodoAte: "31122024" });
    }
    if (period === "anoAtual") {
      setQueries({ periodoDe: "01012025", periodoAte: "31122025" });
    }
  }

  return (
    <DashboardView
      transactions={transacoes.items}
      balance={transacoes.balance}
      isLoadingTransactions={isLoadingTransactions}
      percentual={percentual}
      onChangePeriod={handleChangePeriod}
    />
  );
}
