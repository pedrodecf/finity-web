import { TTransactions } from "@/components/tables/transactions-columns";

type TFinancialSummary = {
  totalSaidas: number;
  totalEntradas: number;
  saldoTotal: number;
};

export function getFinancialSummary(
  transactions: TTransactions[]
): TFinancialSummary {
  let totalEntradas = 0;
  let totalSaidas = 0;

  transactions.forEach(({ valor, tipo }) => {
    if (tipo === "Entrada") {
      totalEntradas += valor;
    } else if (tipo === "Saida") {
      totalSaidas += valor;
    }
  });

  const saldoTotal = totalEntradas - totalSaidas;

  return {
    totalSaidas,
    totalEntradas,
    saldoTotal,
  };
}
