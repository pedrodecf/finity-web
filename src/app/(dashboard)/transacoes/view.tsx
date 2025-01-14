import { transactionsColumnsComplete } from "@/components/tables/transacoes/transactions-columns-complete";
import { TransactionsTableComplete } from "@/components/tables/transacoes/transactions-table-complete";

type TTransacoesView = {
  transacoes: any;
  transacoesOrdenadas: any;
};

export default function TransacoesView({
  transacoes,
  transacoesOrdenadas,
}: TTransacoesView) {
  return (
    <>
      <h1>Transacoes</h1>
      <div className="w-full h-full overflow-hidden tablet:flex tablet:flex-col tablet:overflow-auto tablet:gap-4 pb-6">
        <TransactionsTableComplete
          columns={transactionsColumnsComplete}
          data={transacoesOrdenadas}
        />
      </div>
    </>
  );
}
