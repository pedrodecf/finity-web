import { fetchTransactions } from "@/components/tables/transactions-mock";
import TransacoesView from "./view";

export default function TransacoesPage() {
  const transacoes = fetchTransactions();
  const transacoesOrdenadas = transacoes.sort((a, b) => {
    return new Date(b.data).getTime() - new Date(a.data).getTime();
  });
  return (
    <TransacoesView
      transacoes={transacoes}
      transacoesOrdenadas={transacoesOrdenadas}
    />
  );
}
