import { fetchTransactions } from "@/components/tables/transactions-mock";
import { getFinancialSummary } from "@/lib/getters/get-financial-summary";
import DashboardView from "./view";

export default function DashboardPage() {
  const transacoes = fetchTransactions();
  const { saldoTotal, totalEntradas, totalSaidas } =
    getFinancialSummary(transacoes);
  const transacoesOrdenadas = transacoes.sort((a, b) => {
    return new Date(b.data).getTime() - new Date(a.data).getTime();
  });

  return (
    <DashboardView
      transacoes={transacoes}
      saldoTotal={saldoTotal}
      totalEntradas={totalEntradas}
      totalSaidas={totalSaidas}
      transacoesOrdenadas={transacoesOrdenadas}
    />
  );
}
